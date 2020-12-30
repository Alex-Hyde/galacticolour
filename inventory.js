guns = [document.getElementById("gun1"),document.getElementById("gun2")];
gunIcons = [document.getElementById("gun1Icon"),document.getElementById("gun2Icon")];
bodies = [[document.getElementById("body1Red"), document.getElementById("body1Purple"), document.getElementById("body1Yellow"), document.getElementById("body1Green")],
          [document.getElementById("body2Red"), document.getElementById("body2Purple"), document.getElementById("body2Yellow"), document.getElementById("body2Green")]];
engines = [document.getElementById("engine1"),document.getElementById("engine2")];
engineIcons = [document.getElementById("engine1Icon"),document.getElementById("engine2Icon")];

function loadInventory(bgCoord) {
    entityList.clear();
    entityList.other.push(new InventoryScreen(bgCoord));
}

function InventoryScreen(bgCoord) {
    this.background = document.getElementById("inventoryBG");
    this.menuBG = document.getElementById("menuBG");
    this.shipBG = document.getElementById("inventoryShipBG");
    this.animationImage = document.getElementById("inventoryAnimation");
    this.x = bgCoord;
    this.currentColor = 0;
    this.circleColors = ["red", "#ab11ff", "yellow", "#10ff3a"];
    this.circleData = [0, Math.PI/3, Math.PI/6, -Math.PI/3, -Math.PI*2/3];
    this.shipAngle = 0;
    this.animationIndex = 0;
    this.animationLength = 10;
    this.opening = true;
    this.buttonList = [];
    this.buttonList.push(new CloseInventoryButton());
    this.buttonList.push(new SelectionButton(0, 550, gameScreen.canvas.height/2 - 235, 150, 150));
    this.buttonList.push(new SelectionButton(1, 710, gameScreen.canvas.height/2 - 235, 150, 150));
    this.buttonList.push(new SelectionButton(2, 550, gameScreen.canvas.height/2 - 75, 150, 150));
    this.buttonList.push(new SelectionButton(3, 710, gameScreen.canvas.height/2 - 75, 150, 150));
    this.buttonList.push(new SelectionButton(4, 550, gameScreen.canvas.height/2 + 85, 150, 150));
    this.buttonList.push(new SelectionButton(5, 710, gameScreen.canvas.height/2 + 85, 150, 150));
    this.buttonList.push(new ColorButton());


    this.draw = function(ctx) {
        ctx.drawImage(this.menuBG, this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.x > 3000 -gameScreen.canvas.width) {
            ctx.drawImage(this.menuBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 3000 - this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        }
        ctx.drawImage(this.shipBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.animationIndex > this.animationLength && this.opening) {
            ctx.drawImage(this.background, 0, 0);
            this.drawCircle(ctx);
            this.drawShip(ctx);
            this.buttonList.forEach(b => {
                b.draw(ctx);
            });
        }
        else {
            ctx.drawImage(this.animationImage, 712-712/this.animationLength*this.animationIndex, 190-190/this.animationLength*this.animationIndex,
                          184+(gameScreen.canvas.width-184)/this.animationLength*this.animationIndex, 184+(gameScreen.canvas.height-184)/this.animationLength*this.animationIndex);
            if (this.opening) {
                this.animationIndex++;
            } else {
                this.animationIndex--;
                if (this.animationIndex < 0) {
                    loadMenu(this.x);
                }
            }
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
        this.buttonList.forEach(b => {
            b.update();
        });
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
        ctx.drawImage(engines[player.inventory.engines[player.engine].type], 275-150, gameScreen.canvas.height/2-150, 300, 300);
        ctx.drawImage(guns[player.inventory.allGuns[this.currentColor][player.guns[this.currentColor]].type], 275-150, gameScreen.canvas.height/2-150, 300, 300);
        ctx.drawImage(bodies[player.inventory.bodies[player.body].type][this.currentColor], 275-150, gameScreen.canvas.height/2-150, 300, 300);
        ctx.restore();
    }
}

function PlayerInventory() {
    this.redGuns = [new Gun(0, 10, 10, 10), new Gun(1, 10, 10, 10)];
    this.purpleGuns = [new Gun(0, 10, 10, 10), new Gun(1, 10, 10, 10)];
    this.yellowGuns = [new Gun(0, 10, 10, 10)];
    this.greenGuns = [new Gun(0, 10, 10, 10)];
    this.bodies = [new Body(0, 100), new Body(1, 100)];
    this.engines = [new Engine(0, 3), new Engine(1, 3)];
    this.allGuns = [this.redGuns, this.purpleGuns, this.yellowGuns, this.greenGuns];
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
        entityList.other[0].opening = false;;
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
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        switch (this.type) {
            case 0:
                ctx.drawImage(gunIcons[player.inventory.redGuns[player.guns[0]].type], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                ctx.fillText(String(player.guns[0]+1) + "/" + String(player.inventory.redGuns.length), this.x+12, this.y+this.h-15);
                break;
            case 1:
                ctx.drawImage(gunIcons[player.inventory.purpleGuns[player.guns[1]].type], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                ctx.fillText(String(player.guns[1]+1) + "/" + String(player.inventory.purpleGuns.length), this.x+12, this.y+this.h-15);
                break;
            case 2:
                ctx.drawImage(gunIcons[player.inventory.yellowGuns[player.guns[2]].type], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                ctx.fillText(String(player.guns[2]+1) + "/" + String(player.inventory.yellowGuns.length), this.x+12, this.y+this.h-15);
                break;
            case 3:
                ctx.drawImage(gunIcons[player.inventory.greenGuns[player.guns[3]].type], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                ctx.fillText(String(player.guns[3]+1) + "/" + String(player.inventory.greenGuns.length), this.x+12, this.y+this.h-15);
                break;
            case 4:
                ctx.drawImage(bodies[player.inventory.bodies[player.body].type][entityList.other[0].currentColor], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                ctx.fillText(String(player.body+1) + "/" + String(player.inventory.bodies.length), this.x+12, this.y+this.h-15);
                break;
            case 5:
                ctx.drawImage(engineIcons[player.inventory.engines[player.engine].type], this.x + 15, this.y + 15, this.w - 30, this.h - 30);
                ctx.fillText(String(player.engine+1) + "/" + String(player.inventory.engines.length), this.x+12, this.y+this.h-15);
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
        switch (this.type) {
            case 0:
                player.guns[0] = (player.guns[0]+1)%player.inventory.redGuns.length;
                break;
            case 1:
                player.guns[1] = (player.guns[1]+1)%player.inventory.purpleGuns.length;
                break;
            case 2:
                player.guns[2] = (player.guns[2]+1)%player.inventory.yellowGuns.length;
                break;
            case 3:
                player.guns[3] = (player.guns[3]+1)%player.inventory.greenGuns.length;
                break;
            case 4:
                player.body = (player.body+1)%player.inventory.bodies.length;
                break;
            case 5:
                player.engine = (player.engine+1)%player.inventory.engines.length;
                break;
            default:
                break;
        }
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
