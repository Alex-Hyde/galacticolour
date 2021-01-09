var projsFired = 0;
var levelList = [];
var entityList = [];
var currentLevel = NaN;
var gameclock=0;
//var levelStartTime = NaN;
const root2 = Math.sqrt(2);
var player = null;
const RED = 0;
const PURPLE = 1;
const YELLOW = 2;
const GREEN = 3;

// function run on start
function loadMenu(bgCoord = 0, playMusic) {
    if (!gameScreen.context) { // check if already started (if loading menu from a back button)
        gameScreen.start();
        levelList = createLevelList();
    }
    if (!player) {
        player = new Player(100, 100, 0);
    }
    if (playMusic) {
        menuAudio.currentTime = 0;
        menuAudio.play();
    }
    entityList.clear();
    entityList.other.push(new MainMenu(bgCoord));
    button = new PlayButton(372, 268);
    button.addToScreen();
    button2 = new OpenInventoryButton();
    button2.addToScreen();
    button3 = new OpenInstructionsButton();
    button3.addToScreen();
    button4 = new AudioButton();
    button4.addToScreen();
}

/*     ******** NOT IN USE ANYMORE ********
function loadGame() {
    levelList = createLevelList();
    entityList.clear();
   
    player1 = new Player1(300, 100, 0);
    player2 = new Player2(100, 300, 0);
    player1.spawn();
    player2.spawn();
    tracker1= new tracker("red",100,100)
    tracker1.spawn();
}
*/

var entityList = {
    clear : function() {
        this.other = [];
        this.player = null;
        this.mobList = [];
        this.mobProjectiles = [];
        this.playerProjectiles = [];
        this.staticTexturesBack = [];
        this.staticTextures = [];
        this.buttons = [];
        player.clear();
    },
    draw : function() {
        // drawn in predetermined order: (mobs, player, static textures, mob bullets, player bullets, buttons)
        this.other.forEach(e => {
            e.draw(gameScreen.context);
        });
        this.staticTexturesBack.forEach(e => {
            e.draw(gameScreen.context);
        });
        this.mobList.forEach(e => {
            e.draw(gameScreen.context);
            e.healthBar();
        });
        this.playerProjectiles.forEach(e => {
            e.draw(gameScreen.context);
        });
        if (this.player) {
            this.player.draw(gameScreen.context);
        }
        this.staticTextures.forEach(e => {
            e.draw(gameScreen.context);
        });
        this.mobProjectiles.forEach(e => {
            e.draw(gameScreen.context);
        });
        this.buttons.forEach(e => {
            e.draw(gameScreen.context);
        });
    },
    update : function() {
        this.other.forEach(e => {
            e.update();
        });
        this.mobList.forEach(e => {
            e.update();
        });
        if (this.player) {
            this.player.update();
        }
        this.mobProjectiles.forEach(e => {
            e.update();
        });
        this.playerProjectiles.forEach(e => {
            e.update();
        });
        this.buttons.forEach(e => {
            e.update();
        });
        levelSelect();
    }
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
        this.x = -1;
        this.y = -1;
        this.pressed = false;
        this.clicked = false;

        // Event listeners
        window.addEventListener('keydown', function (e) {
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
            gameScreen.clicked = true;
        })
        window.addEventListener('mouseup', function (e) {
            gameScreen.pressed = false;
        })
        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        })
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    },
    reset : function() {
        this.clicked = false;
        this.clickedKeys = [];
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
    gameclock+= (4 * player.playertime);
    
    if (currentLevel && levelList[currentLevel-1].bgX == undefined) {
        levelList[currentLevel-1].update();
    }
    // update all the entities (movement, collision, etc.)
    entityList.update();
    // draw all the entities after updating them
    entityList.draw(gameScreen.context);

    gameScreen.reset();
}
