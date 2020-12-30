guns = [document.getElementById("gun1")];
gunIcons = [document.getElementById("gun1Icon")];
bodies = [[document.getElementById("body1Red"), document.getElementById("body1Purple"), document.getElementById("body1Yellow"), document.getElementById("body1Green")]];
engines = [document.getElementById("engine1")];
engineIcons = [document.getElementById("engine1Icon")];

function loadInventory(bgCoord) {
    entityList.clear();
    entityList.other.push(new InventoryScreen(bgCoord));
    closeButton = new CloseInventoryButton();
    closeButton.addToScreen();
    b = new SelectionButton(0, 550, gameScreen.canvas.height/2 - 235, 150, 150);
    b.addToScreen();
    b = new SelectionButton(1, 710, gameScreen.canvas.height/2 - 235, 150, 150);
    b.addToScreen();
    b = new SelectionButton(2, 550, gameScreen.canvas.height/2 - 75, 150, 150);
    b.addToScreen();
    b = new SelectionButton(3, 710, gameScreen.canvas.height/2 - 75, 150, 150);
    b.addToScreen();
    b = new SelectionButton(4, 550, gameScreen.canvas.height/2 + 85, 150, 150);
    b.addToScreen();
    b = new SelectionButton(5, 710, gameScreen.canvas.height/2 + 85, 150, 150);
    b.addToScreen();
    colorButton = new ColorButton();
    colorButton.addToScreen();
    new staticAnimation([document.getElementById("inventoryAnimation1"), document.getElementById("inventoryAnimation2"), document.getElementById("inventoryAnimation3"), document.getElementById("inventoryAnimation4")],
                        0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 1);
}

function InventoryScreen(bgCoord) {
    this.background = document.getElementById("inventoryBG");
    this.menuBG = document.getElementById("menuBG");
    this.shipBG = document.getElementById("inventoryShipBG");
    this.x = bgCoord;
    this.currentColor = 0;
    this.circleColors = ["red", "#ab11ff", "yellow", "#10ff3a"];
    this.circleData = [0, Math.PI/3, Math.PI/6, -Math.PI/3, -Math.PI*2/3];
    this.shipAngle = 0;


    this.draw = function(ctx) {
        ctx.drawImage(this.menuBG, this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.x > 3000 -gameScreen.canvas.width) {
            ctx.drawImage(this.menuBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 3000 - this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        }
        ctx.drawImage(this.shipBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (!entityList.staticTextures.length) {
            ctx.drawImage(this.background, 0, 0);
            this.drawCircle(ctx);
            this.drawShip(ctx);
        }
    }

    this.update = function() {
        this.x += 0.5;
        this.x = this.x % 3000;
        this.circleData[0] += 0.005;
        this.circleData[1] -= 0.005;
        this.circleData[2] += 0.01;
        this.circleData[3] -= 0.015;
        this.circleData[4] += 0.0125;
        this.shipAngle += 0.005;
    }

    this.drawCircle = function(ctx) {
        ctx.strokeStyle = this.circleColors[this.currentColor];
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(275, gameScreen.canvas.height/2, 206, this.circleData[0], this.circleData[0]+Math.PI/3);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(275, gameScreen.canvas.height/2, 200, this.circleData[1], this.circleData[1]+Math.PI/2);
        ctx.stroke();
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(275, gameScreen.canvas.height/2, 212, this.circleData[2], this.circleData[2]+Math.PI);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(275, gameScreen.canvas.height/2, 218, this.circleData[3], this.circleData[3]+Math.PI/4);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(275, gameScreen.canvas.height/2, 224, this.circleData[4], this.circleData[4]+Math.PI*2/3);
        ctx.stroke();
        ctx.lineWidth = 1;
    }

    this.drawShip = function(ctx) {
        ctx.save();
        ctx.translate(275, gameScreen.canvas.height/2);
        ctx.rotate(this.shipAngle);
        ctx.translate(-275, -gameScreen.canvas.height/2);
        ctx.drawImage(engines[player.engine], 275-150, gameScreen.canvas.height/2-150, 300, 300);
        ctx.drawImage(guns[player.guns[this.currentColor]], 275-150, gameScreen.canvas.height/2-150, 300, 300);
        ctx.drawImage(bodies[player.body][this.currentColor], 275-150, gameScreen.canvas.height/2-150, 300, 300);
        ctx.restore();
    }
}

function PlayerInventory() {
    this.redGuns = [new Gun(0, 10, 10, 10)];
    this.purpleGuns = [new Gun(0, 10, 10, 10)];
    this.yellowGuns = [new Gun(0, 10, 10, 10)];
    this.greenGuns = [new Gun(0, 10, 10, 10)];
    this.bodies = [new Body(0, 100)];
    this.engines = [new Engine(0, 3)];
}

function Gun(type, damage, firerate, range) {
    this.type = type;
    this.damage = damage;
    this.firerate = firerate;
    this.range = range;
}

function Body(type, health) {
    this.type = type;
    this.health = health;
}

function Engine(type, speed) {
    this.type = type;
    this.speed = speed;
}

function OpenInventoryButton() {
    Button.call(this, 712, 190, 184, 184);
    this.defaultImage = document.getElementById("openInventory");
    this.hoverImage = document.getElementById("openInventoryHover");
    this.pressedImage = document.getElementById("openInventoryPressed");
    this.image = this.defaultImage;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
    }

    this.onHover = function() {
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.image = this.defaultImage;
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onRelease = function() {
        loadInventory(entityList.other[0].x);
    }
}

function CloseInventoryButton() {
    Button.call(this, 50, 50, 50, 50);
    this.defaultImage = document.getElementById("powerButton");
    this.image = this.defaultImage;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        loadMenu(entityList.other[0].x);
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
    }

    this.onHover = function() {
        this.w += 4;
        this.h += 4;
        this.x -= 2;
        this.y -= 2;
    }

    this.onUnHover = function() {
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
    }
}

function SelectionButton(type, x, y, w, h) {
    Button.call(this, x, y, w, h);
    this.type = type;
    this.hoverImage = document.getElementById("inventoryButtonHover");
    this.pressedImage = document.getElementById("inventoryButtonPressed");
    switch (type) {
        case 0:
            this.defaultImage = document.getElementById("redInventoryButton");
            break;
        case 1:
            this.defaultImage = document.getElementById("purpleInventoryButton");
            break;
        case 2:
            this.defaultImage = document.getElementById("yellowInventoryButton");
            break;
        case 3:
            this.defaultImage = document.getElementById("greenInventoryButton");
            break;
        case 4:
            this.defaultImage = document.getElementById("blueInventoryButton");
            break;
        case 5:
            this.defaultImage = document.getElementById("blueInventoryButton");
            break;
        default:
            break;
    }
    this.borderImage = this.defaultImage;
    this.image = null;

    this.draw = function(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        }
        ctx.drawImage(this.borderImage, this.x, this.y, this.w, this.h);
        switch (this.type) {
            case 0:
                ctx.drawImage(gunIcons[player.guns[0]], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                break;
            case 1:
                ctx.drawImage(gunIcons[player.guns[1]], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                break;
            case 2:
                ctx.drawImage(gunIcons[player.guns[2]], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                break;
            case 3:
                ctx.drawImage(gunIcons[player.guns[3]], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                break;
            case 4:
                ctx.drawImage(bodies[player.body][entityList.other[0].currentColor], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                break;
            case 5:
                ctx.drawImage(engineIcons[player.engine], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                break;
            default:
                break;
        }
    }

    this.onHover = function() {
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.image = null;
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onRelease = function() {
        this.image = null;
    }
}

function ColorButton() {
    Button.call(this, 50, gameScreen.canvas.height - 100, 50, 50);
    this.image = document.getElementById("colorSwitchButton");
    this.angle = 0;

    this.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x+this.w/2,this.y+this.h/2);
        ctx.rotate(this.angle);
        ctx.translate(-this.x-this.w/2,-this.y-this.h/2);
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        ctx.restore();
    }

    this.onHover = function() {
        this.w += 4;
        this.h += 4;
        this.x -= 2;
        this.y -= 2;
    }

    this.onUnHover = function() {
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
    }

    this.onRelease = function() {
        entityList.other[0].currentColor = (entityList.other[0].currentColor + 1) % 4;
        this.angle = this.angle-Math.PI/2
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
    }
}
