



var levelList = [];
var entityList = [];
var currentLevel = NaN;
//var levelStartTime = NaN;
const root2 = Math.sqrt(2);
var mainplayer= null;

// function run on start
function loadMenu() {
    levelList = createLevelList();
    if (!gameScreen.context) { // check if already started (if loading menu from a back button)
        gameScreen.start();
    }
    entityList.clear();
    entityList.other.push(new MainMenu());
    button = new PlayButton((gameScreen.canvas.width-400)/2, (gameScreen.canvas.height-100)/2 + 100);
    button.addToScreen();
    staticAnimation([document.getElementById("playerred"),document.getElementById("playerpurple"),document.getElementById("playeryellow"),document.getElementById("playergreen")], 10, 100, 60, 60, 10, 9);
}

function loadGame() {
    //var level1 = new Level([new Wave([[Mob1, 5], [Mob2, 7], [Mob3, 10]], 22, 1500), new Wave([[Mob1, 3], [Mob2, 3], [Mob3, 6]], 12, 1500)]);
    //var level2 = new Level([new Wave([[Mob2, 7], [Mob3, 10]], 17, 1500), new Wave([[Mob1, 3], [Mob2, 3]], 6, 1500)]);
    //var level3 = new Level([new Wave([[Mob1, 9], [Mob2, 3], [Mob3, 2]], 14, 1500), new Wave([[Mob1, 5], [Mob2, 2], [Mob3, 6]], 13, 1500)]);
    levelList = createLevelList();
    entityList.clear();
    mainplayer= new Player(200,200, 0);
    mainplayer.spawn();
    player1 = new Player1(300, 100, 0);
    player2 = new Player2(100, 300, 0);
    // mob1 = new Mob1(gameScreen.canvas.width/2, gameScreen.canvas.height/2, 0);
    // mob2 = new Mob2(gameScreen.canvas.width/2, gameScreen.canvas.height/2+80, 0);
    // mob3 = new Mob3(gameScreen.canvas.width/2, gameScreen.canvas.height/2+160, 0);
    player1.spawn();
    player2.spawn();
    // mob1.spawn();
    // mob2.spawn();
    // mob3.spawn();
    tracker1= new tracker("red",100,100)
    tracker1.spawn();
}

var entityList = {
    clear : function() {
        this.other = [];
        this.player = null;
        this.mobList = [];
        this.mobProjectiles = [];
        this.playerProjectiles = [];
        this.staticTextures = [];
        this.buttons = [];
    },
    draw : function() {
        // drawn in predetermined order: (mobs, player, static textures, mob bullets, player bullets, buttons)
        this.other.forEach(e => {
            e.draw(gameScreen.context);
        });
        this.mobList.forEach(e => {
            e.draw(gameScreen.context);
        });
        this.playerProjectiles.forEach(e => {
            e.draw(gameScreen.context);
        });
        if (this.player) {
            this.player.draw(ctx);
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
    // listen for level triggers
    levelSelect();                // uses Level.loadLevel which sets currentLevel
    // load current level
    
    //console.log(currentLevel);
    if (currentLevel) {
        levelList[currentLevel-1].update();
    }
    // update all the entities (movement, collision, etc.)
    entityList.update();
    // draw all the entities after updating them
    entityList.draw(gameScreen.context);

    gameScreen.reset();
}
