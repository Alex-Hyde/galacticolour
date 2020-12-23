var player;
var bulletArray = [];
const root2 = Math.sqrt(2);
const zoom = 5/6;

function loadGame() {
    player = new Player(50,50, "blue", 300, 500);
    gameScreen.start();
}

var gameScreen = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        this.background = document.getElementById("space");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(main, 15);
        // this.canvas.x = (window.innerWidth-this.canvas.width)/2;
        // this.canvas.y = (window.innerHeight-this.canvas.height)/2;
        console.log(this.canvas.x);
        this.clickedKeys = [];
        window.addEventListener('keydown', function (e) {
            gameScreen.keys = (gameScreen.keys || []);
            gameScreen.keys[e.keyCode] = true;
            gameScreen.clickedKeys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            gameScreen.keys[e.keyCode] = false;
        })
        window.addEventListener('mousemove', function (e) {
            var rect = gameScreen.canvas.getBoundingClientRect();
            gameScreen.x = e.pageX - rect.left;
            gameScreen.y = e.pageY - rect.top;
        })
        window.addEventListener('mousedown', function (e) {
            gameScreen.pressed = true;
        })
        // window.addEventListener('mouseup', function (e) {
        //     gameScreen.pressed = false;
        // })
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.context.drawImage(document.getElementById("space"), player.x/this.canvas.width*1920*(1-zoom), player.y/this.canvas.height*1080*(1-zoom), 1920*zoom, 1080*zoom, 0, 0, this.canvas.width, this.canvas.height);
    }
}

function getAngle(x1, y1, x2, y2) {
    if (x2-x1 == 0) { // division by 0
        if (y2-y1 < 0) {
            return -Math.PI/2
        }
        return Math.PI/2;
    }
    var angle = Math.atan((y2-y1)/(x2-x1));
    if (x2-x1 < 0) {
        return Math.PI + angle;
    }
    return angle;
}

function main() {
    gameScreen.clear();
    player.update();
    bulletArray.forEach(b => {
        b.update();
    });
    gameScreen.clickedKeys = [];
}

function Player(width, height, color, x, y) {
    this.gameScreen = gameScreen;
    this.angle = 0;
    this.left_bullet = true;
    this.bulletColorInd = 0;
    this.bulletColor = ["red", "magenta", "yellow", "green"];
    this.changeColor = false;
    this.width = width;
    this.height = height;
    this.x = x,
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.imageRed = document.getElementById("playerred");
    this.imagePurple = document.getElementById("playerpurple");
    this.imageYellow = document.getElementById("playeryellow");
    this.imageGreen = document.getElementById("playergreen");
    this.images = [this.imageRed, this.imagePurple, this.imageYellow, this.imageGreen];
    this.update = function() {
        this.move();
        this.shoot();
        context = this.gameScreen.context;
        context.save();

        context.translate(this.x,this.y);
        this.angle = getAngle(this.x, this.y, this.gameScreen.x, this.gameScreen.y);
        context.rotate(this.angle + Math.PI/2);
        context.translate(-this.x,-this.y);

        context.drawImage(this.images[this.bulletColorInd], this.x-this.width/2, this.y-this.height/2, this.width, this.height);

        context.restore();
    }
    this.move = function() {
        this.speedX = 0;
        this.speedY = 0;
        if (this.gameScreen.keys && this.gameScreen.keys[87]) {this.speedY = 5;}
        if (this.gameScreen.keys && this.gameScreen.keys[65]) {this.speedX = -5;}
        if (this.gameScreen.keys && this.gameScreen.keys[83]) {this.speedY = -5;}
        if (this.gameScreen.keys && this.gameScreen.keys[68]) {this.speedX = 5;}
        if (this.speedX != 0 && this.speedY != 0) {
            this.speedX /= root2;
            this.speedY /= root2;
        }
        this.x += this.speedX;
        this.y -= this.speedY;

        this.borderCollision();
    }
    this.borderCollision = function() {
        if (this.x > this.gameScreen.canvas.width - this.width/2) {this.x = this.gameScreen.canvas.width - this.width/2;}
        else if (this.x < this.width/2) {this.x = this.width/2}
        if (this.y > this.gameScreen.canvas.height - this.height/2) {this.y = this.gameScreen.canvas.height - this.height/2;}
        else if (this.y < this.height/2) {this.y = this.height/2;}
    }
    this.shoot = function() {
        if (this.gameScreen.clickedKeys[32]) {this.changeColor = true;}
        if (this.changeColor) {
            this.bulletColorInd = (this.bulletColorInd + 1) % 4;
            this.changeColor = false;
        }
        if (this.gameScreen.pressed) {
            this.gameScreen.pressed = false;
            if (this.left_bullet) {
                bulletArray.push(new Bullet(5, 30, this.angle, 20, this.x-Math.cos(this.angle+Math.PI/2)*this.width/3, 
                                this.y-Math.sin(this.angle+Math.PI/2)*this.height/3, this.bulletColor[this.bulletColorInd]));
                this.left_bullet = false;
            }
            else {
                bulletArray.push(new Bullet(5, 30, this.angle, 20, this.x+Math.cos(this.angle+Math.PI/2)*this.width/3, 
                                this.y+Math.sin(this.angle+Math.PI/2)*this.height/3, this.bulletColor[this.bulletColorInd]));
                this.left_bullet = true;
            }
        }
    }
}

function Bullet(width, height, angle, speed, x, y, color) {
    this.gameScreen = gameScreen;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function() {
        this.move();
        context = this.gameScreen.context;
        context.save();

        context.translate(this.x,this.y);
        context.rotate(this.angle+Math.PI/2);
        context.translate(-this.x,-this.y);

        context.fillStyle = this.color;
        context.fillRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height);

        context.restore();
    }
    this.move = function() {
        this.x += Math.cos(this.angle)*this.speed;
        this.y += Math.sin(this.angle)*this.speed;
    }
}
