function loadInstructions(bgCoord, audioTime) {
    entityList.clear();
    entityList.other.push(new InstructionsScreen(bgCoord));
}

function InstructionsScreen(bgCoord) {
    this.pages = [[document.getElementById("manualpage1")],
    [document.getElementById("manualpage2-1"), document.getElementById("manualpage2-3"), document.getElementById("manualpage2-2"), document.getElementById("manualpage2-3"), 
    document.getElementById("manualpage2-4"), document.getElementById("manualpage2-6"), document.getElementById("manualpage2-5"), document.getElementById("manualpage2-6"), document.getElementById("manualpage2-7"), document.getElementById("manualpage2-9"),
    document.getElementById("manualpage2-8"), document.getElementById("manualpage2-9"), document.getElementById("manualpage2-10"), document.getElementById("manualpage2-12"), document.getElementById("manualpage2-11"),
    document.getElementById("manualpage2-12")], [document.getElementById("manualpage3-1"), document.getElementById("manualpage3-2")], [document.getElementById("manualpage4-1"), 
    document.getElementById("manualpage4-2"), document.getElementById("manualpage4-3"), document.getElementById("manualpage4-4"), document.getElementById("manualpage4-5"),
    document.getElementById("manualpage4-6"), document.getElementById("manualpage4-7"), document.getElementById("manualpage4-8"), document.getElementById("manualpage4-9")],
    [document.getElementById("manualpage5-1"), document.getElementById("manualpage5-2"), document.getElementById("manualpage5-3"), document.getElementById("manualpage5-4"),
    document.getElementById("manualpage5-5"), document.getElementById("manualpage5-6"), document.getElementById("manualpage5-7"), document.getElementById("manualpage5-8"),
    document.getElementById("manualpage5-9"), document.getElementById("manualpage5-10")]];
    this.pageIndex = 0;
    this.currentPage = this.pages[this.pageIndex];
    this.lastRefresh = 0;
    this.animationIndex = 0;
    this.x = bgCoord;
    this.menuBG = document.getElementById("menuBG");
    this.shipBG = document.getElementById("inventoryShipBG");
    this.buttonList = [];
    this.nextLastButtonList = [];
    this.buttonList.push(new CloseInstructionsButton());
    this.playerExampleSpawned = false;
    this.exampleWidth = 270;
    this.exampleHeight = 200
    this.exampleBGX = 500;
    this.exampleBGY = 120;
    this.nextButtonX = 790;
    //this.audio = new Audio('songs/menuscreen_3.mp3');
    
    this.draw = function(ctx) {
        this.currentPage = this.pages[this.pageIndex];
        ctx.drawImage(this.menuBG, this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.x > 3000 -gameScreen.canvas.width) {
            ctx.drawImage(this.menuBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 3000 - this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        }
        ctx.drawImage(this.shipBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        refresh = new Date().getTime();
        if (refresh - this.lastRefresh > 400) {
            this.lastRefresh = refresh
            this.animationIndex++;
        }
        ctx.drawImage(this.currentPage[this.animationIndex % this.currentPage.length],80,-30);
        this.buttonList.forEach(b => {
            b.draw(ctx);
        });
        this.nextLastButtonList.forEach(b => {
            b.draw(ctx);
        });
        if (this.pageIndex == 0) {
            if (!this.playerExampleSpawned) {
                entityList.player = new Player(635, 220, 0);
                entityList.player.example = true;
                this.playerExampleSpawned = true;
            }
            entityList.player.lowerBoundX = 535;
            entityList.player.upperBoundX = 735;
            entityList.player.lowerBoundY = 155;
            entityList.player.upperBoundY = 285;
            
            ctx.drawImage(document.getElementById("space"), 500, 120, 270, 200);
            entityList.playerProjectiles=entityList.playerProjectiles.filter(i=> i.x < entityList.player.upperBoundX && i.x >entityList.player.lowerBoundX && i.y > entityList.player.lowerBoundY && i.y < entityList.player.upperBoundY); 

        }
    }
    this.update = function() {
        this.currentPage = this.pages[this.pageIndex];
        this.x += 0.5;
        this.x = this.x % 3000;
        
        this.buttonList.forEach(b => {
            b.update();
        });
        this.nextLastButtonList.forEach(b => {
            b.update();
        });
    }
    
    this.updatePage = function() {
        if (this.pageIndex == 0) {
            this.nextLastButtonList.push(new NextPageButton(1));
        } else if (this.pageIndex == 1) {
            this.nextLastButtonList.push(new NextPageButton(2));
            this.nextLastButtonList.push(new PreviousPageButton(0));
        } else if (this.pageIndex == 2) {
            this.nextLastButtonList.push(new NextPageButton(3));
            this.nextLastButtonList.push(new PreviousPageButton(1));
        } else if (this.pageIndex == 3) {
            this.nextLastButtonList.push(new NextPageButton(4));
            this.nextLastButtonList.push(new PreviousPageButton(2));
        } else if (this.pageIndex == 4) {
            this.nextLastButtonList.push(new PreviousPageButton(3));
        }
    }
}


function OpenInstructionsButton() {
    Button.call(this, 100, 312, 105, 90);
    this.frontImage = document.getElementById("openManual");
    this.defaultImage = document.getElementById("openManualDefault");
    this.hoverImage = document.getElementById("openManualHover");
    this.pressedImage = document.getElementById("openManualPressed");
    this.image = this.defaultImage;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        ctx.drawImage(this.frontImage, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
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
        new Audio('sounds/page turn2.mp3').play();
        //entityList.other[0].audio.pause();
        loadInstructions(entityList.other[0].x);
        entityList.other[0].updatePage();
    }
}

function CloseInstructionsButton() {
    Button.call(this, 790, 30, 20, 20);
    this.defaultImage = document.getElementById("manualexitbutton");
    this.hoverImage = document.getElementById("manualexitbuttonhovered");
    this.pressedImage = document.getElementById("manualexitbuttonpressed");
    this.image = this.defaultImage;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        //menuscreenAudio.pause();
        new Audio('sounds/manual close.mp3').play();
        loadMenu(0, false);
        entityList.player = null;
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onHover = function() {
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.image = this.defaultImage;
    }
}

function NextPageButton(next) {
    this.changingX = entityList.other[0].nextButtonX + 12 * entityList.other[0].pageIndex;
    Button.call(this, this.changingX, 200, 50, 125);
    this.defaultImage = document.getElementById("manualnextbutton");
    this.hoverImage = document.getElementById("manualnextbuttonhovered");
    this.pressedImage = document.getElementById("manualnextbuttonpressed");
    this.image = this.defaultImage;
    this.ticks = 0;
    this.pressed = false;
    this.coolDown = 1000;
    this.next = next
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        new Audio('sounds/page turn1.mp3').play()
        if (entityList.other[0].pageIndex == 0) {
            entityList.player = null;
            entityList.other[0].playerExampleSpawned = false;
        }
        entityList.other[0].pageIndex = this.next;
        entityList.other[0].nextLastButtonList = [];
        entityList.playerProjectiles = [];
        entityList.other[0].updatePage();
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onHover = function() {
        this.w += 4;
        this.h += 4;
        this.x -= 2;
        this.y -= 2;
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
        this.image = this.defaultImage;
    }
}

function PreviousPageButton(previous) {
    Button.call(this, 100, 200, 50, 125);
    this.defaultImage = document.getElementById("manualbackbutton");
    this.hoverImage = document.getElementById("manualbackbuttonhovered");
    this.pressedImage = document.getElementById("manualbackbuttonpressed");
    this.image = this.defaultImage;
    this.lastPressed = 0;
    this.coolDown = 1000;
    this.pressed = false;
    this.previous = previous;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        new Audio('sounds/page turn1.mp3').play()
        entityList.other[0].pageIndex = this.previous;
        entityList.other[0].nextLastButtonList = [];
        entityList.other[0].updatePage();
    }

    this.onClick = function() {
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
        this.image = this.pressedImage;
    }

    this.onHover = function() {
        this.w += 4;
        this.h += 4;
        this.x -= 2;
        this.y -= 2;
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
        this.image = this.defaultImage;
    }
}