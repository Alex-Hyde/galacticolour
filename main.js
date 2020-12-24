var entityList = [];
const root2 = Math.sqrt(2);

// function run on start
function loadGame() {
    hitbox1 = new Hitbox([new rectHitbox(-20, 0, 40, 20), new rectHitbox(-5, -20, 10, 20), new rectHitbox(-15, -10, 5, 10), new rectHitbox(10, -10, 5, 10)]);
    hitbox2 = new Hitbox([new rectHitbox(-10, -15, 100,100)]);
    // console.log(hitbox.shapeList);
    gameScreen.start();
    entityList[0] = new Player1(300, 100, 0, hitbox1, gameScreen);
    entityList[1] = new Player2(100, 300, 0, hitbox2, gameScreen);
}

var gameScreen = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(main, 15);
        this.clickedKeys = []; // detecting single press of key


        // Event listeners
        window.addEventListener('keydown', function (e) {
            gameScreen.clickedKeys = [];
            gameScreen.keys = (gameScreen.keys || []);
            gameScreen.keys[e.keyCode] = true;
            gameScreen.clickedKeys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            gameScreen.keys[e.keyCode] = false;
        })
        window.addEventListener('mousemove', function (e) {
            var rect = gameScreen.canvas.getBoundingClientRect(); // adjust for position of canvas relative to window
            gameScreen.x = e.pageX - rect.left;
            gameScreen.y = e.pageY - rect.top;
        })
        window.addEventListener('mousedown', function (e) {
            gameScreen.pressed = true;
        })
        window.addEventListener('mouseup', function (e) {
            gameScreen.pressed = false;
        })
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
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

    // update all the entities (movement, collision, etc.)
    entityList.forEach(e => {
        e.update();
    });
    // draw all the entities after updating them
    entityList.forEach(e => {
        e.draw(gameScreen.context);
        e.reset();
    });
}
