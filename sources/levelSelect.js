// position of levels on the map
levelCoordinates = [[100,300], [400, 100], [500, 400], [700, 200], [900, 300], [1100, 100], [1200, 400], 
                    [1400, 300], [1600, 100], [1800, 250], [2020, 175], [2200, 300], [2430, 400], [2600, 250]];
levelImages = [document.getElementById("planet"), document.getElementById("planet2"), document.getElementById("planet3"), document.getElementById("planet4"), document.getElementById("planet5")];

// loads the level select screen to display it
function loadLevelSelect(levelInd) {
    entityList.clear();
    console.log(levelInd);
    entityList.other.push(new LevelSelect(levelInd));
    entityList.buttons.push(new startLevelButton());
    entityList.buttons.push(new BackButton());

}

function LevelSelect(levelInd) {
    this.w = 50;
    this.h = 50;
    this.bgX = 0;
    this.angle = Math.PI/2;
    this.image = document.getElementById("playergreen");
    this.bgImage = document.getElementById("levelSelectBG");
    this.currentLevelIndex = levelInd;
    this.x = levelCoordinates[this.currentLevelIndex][0];
    this.y = levelCoordinates[this.currentLevelIndex][1];
    this.animation = false;
    this.animationIndex = this.currentLevelIndex;
    this.animationStart = null;
    this.animationEnd = null;
    this.animationLength = 30; // constant

    this.update = function() {
        // move right
        if (((gameScreen.keys && gameScreen.keys[68]) || (gameScreen.pressed && gameScreen.x > this.x - this.bgX && 
                    gameScreen.y > 100 && gameScreen.y < gameScreen.canvas.height - 100)) && !this.animation) {
            if (this.currentLevelIndex + 1 < levelCoordinates.length && levelList[this.currentLevelIndex + 1].unlocked) {
                this.currentLevelIndex++;
                this.updateAngle(this.currentLevelIndex);
                this.animation = true;
                this.animationStart = [this.x, this.y];
                this.animationEnd = levelCoordinates[this.currentLevelIndex];
            }
        // move left
        } else if (((gameScreen.keys && gameScreen.keys[65]) || (gameScreen.pressed && gameScreen.x < this.x - this.bgX && 
                    gameScreen.y > 100 && gameScreen.y < gameScreen.canvas.height - 100)) && !this.animation) {
            if (this.currentLevelIndex - 1 >= 0) {
                this.currentLevelIndex--;
                this.updateAngle(this.currentLevelIndex);
                this.animation = true;
                this.animationStart = [this.x, this.y];
                this.animationEnd = levelCoordinates[this.currentLevelIndex];
            }
        }
        // slide ship to next/previous level
        if (this.animation) {
            this.animationIndex++;
            this.x = this.animationStart[0] + this.animationIndex / this.animationLength * (this.animationEnd[0] - this.animationStart[0]);
            this.y = this.animationStart[1] + this.animationIndex / this.animationLength * (this.animationEnd[1] - this.animationStart[1]);
            if (this.animationIndex == this.animationLength) {
                this.animation = false;
                this.animationIndex = 0;
            }
        } else {
            this.updateAngle(this.currentLevelIndex+1);
        }
        levelIndex = this.currentLevelIndex;
        this.updateBGX();
    }

    // points ship at the given level (by index)
    this.updateAngle = function(ind) {
        if (ind < levelCoordinates.length) {
            this.angle = getAngle(this.x, this.y, levelCoordinates[ind][0], levelCoordinates[ind][1]) + Math.PI/2;
        } else {
            this.angle = Math.PI/2;
        }
    }
    
    // start by pointing ship at level 2 (since ship is at level 1)
    this.updateAngle(this.currentLevelIndex + 1);

    // slide background with ship movement
    this.updateBGX = function() {
        if (this.x >= gameScreen.canvas.width/2 && this.x <= 3000 - gameScreen.canvas.width/2) {
            this.bgX = this.x - gameScreen.canvas.width/2;
        } else if (this.x < gameScreen.canvas.width/2) {
            this.bgX = 0;
        } else if (this.x > 3000 - gameScreen.canvas.width/2) {
            this.bgX = 3000 - gameScreen.canvas.width;
        }
    }

    this.draw = function(ctx) {
        ctx.drawImage(this.bgImage, this.bgX, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);

        for (i = 0; i < levelList.length; i++) {
            if (levelList[i].complete) {
                ctx.drawImage(document.getElementById("shipGlowGreen"), levelCoordinates[i][0] - this.bgX-50, levelCoordinates[i][1]-50, 100, 100);
            }
        }
        
        for (i = 0; i < levelCoordinates.length; i++) {
            if (i + 1 < levelCoordinates.length) {
                ctx.beginPath();
                if (levelList[this.currentLevelIndex + 1].unlocked) {
                    ctx.strokeStyle = "red";
                } else {
                    ctx.strokeStyle = "grey";
                }
                ctx.moveTo(levelCoordinates[i][0] - this.bgX, levelCoordinates[i][1]);
                ctx.lineTo(levelCoordinates[i+1][0] - this.bgX, levelCoordinates[i+1][1]);
                ctx.stroke();
            }
            ctx.fillStyle = "blue";
            ctx.drawImage(levelImages[i%5], levelCoordinates[i][0] - this.bgX-50, levelCoordinates[i][1]-50, 100, 100);
        };

        ctx.save();

        ctx.translate(this.x - this.bgX, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x + this.bgX, -this.y);

        ctx.drawImage(this.image, this.x - this.w/2 - this.bgX, this.y - this.h/2, this.w, this.h);

        ctx.restore();
    }

    this.reset = function() {

    }
}

function startLevelButton() {
    Button.call(this, (gameScreen.canvas.width - 200)/2, gameScreen.canvas.height - 10 - 50, 200, 50);
    this.defaultImage = document.getElementById("launchButtonDefault");
    this.hoverImage = document.getElementById("launchButtonHover");
    this.pressedImage = document.getElementById("launchButtonPressed");
    this.image = this.defaultImage;

    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
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
        levelList[levelIndex].loadLevel();
    }
}

function BackButton() {
    Button.call(this, 10, 10, 70, 50);
    this.defaultImage = document.getElementById("backButton");
    this.hoverImage = document.getElementById("backButtonHover");
    this.pressedImage = document.getElementById("backButtonPressed");
    this.image = this.defaultImage;

    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
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
        loadMenu();
    }
}
