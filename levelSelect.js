levelCoordinates = [[100,300], [400, 100], [500, 400], [700, 200], [900, 300], [1100, 100], [1200, 400], 
                    [1400, 300], [1600, 100], [1800, 250], [2020, 175], [2200, 300], [2430, 400], [2600, 250]];

function loadLevelSelect() {
    entityList = [];
    entityList[0] = new LevelSelect();
    entityList[1] = new startLevelButton();
    entityList[2] = new BackButton();

}

function LevelSelect() {
    this.x = levelCoordinates[0][0];
    this.y = levelCoordinates[0][1];
    this.w = 50;
    this.h = 50;
    this.bgX = 0;
    this.angle = Math.PI/2;
    this.image = document.getElementById("playergreen");
    this.bgImage = document.getElementById("levelSelectBG");
    this.currentLevelIndex = 0;
    this.animation = false;
    this.animationIndex = 0;
    this.animationStart = null;
    this.animationEnd = null;
    this.animationLength = 30; // constant

    this.update = function() {
        if (gameScreen.keys && gameScreen.keys[68] && !this.animation) {
            if (this.currentLevelIndex + 1 < levelCoordinates.length) {
                this.currentLevelIndex++;
                this.updateAngle(this.currentLevelIndex);
                this.animation = true;
                this.animationStart = [this.x, this.y];
                this.animationEnd = levelCoordinates[this.currentLevelIndex];
            }
        } else if (gameScreen.keys && gameScreen.keys[65] && !this.animation) {
            if (this.currentLevelIndex - 1 >= 0) {
                this.currentLevelIndex--;
                this.updateAngle(this.currentLevelIndex);
                this.animation = true;
                this.animationStart = [this.x, this.y];
                this.animationEnd = levelCoordinates[this.currentLevelIndex];
            }
        }
        if (this.animation) {
            this.animationIndex++;
            this.x = this.animationStart[0] + this.animationIndex / this.animationLength * (this.animationEnd[0] - this.animationStart[0]);
            this.y = this.animationStart[1] + this.animationIndex / this.animationLength * (this.animationEnd[1] - this.animationStart[1]);
            if (this.animationIndex == this.animationLength) {
                this.animation = false;
                this.animationIndex = 0;
                this.updateAngle(this.currentLevelIndex+1);
            }
        }
        this.updateBGX();
    }

    this.updateAngle = function(ind) {
        if (ind < levelCoordinates.length) {
            this.angle = getAngle(this.x, this.y, levelCoordinates[ind][0], levelCoordinates[ind][1]) + Math.PI/2;
        } else {
            this.angle = Math.PI/2;
        }
    }
    
    this.updateAngle(1);

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

        for (i = 0; i < levelCoordinates.length; i++) {
            if (i + 1 < levelCoordinates.length) {
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.moveTo(levelCoordinates[i][0] - this.bgX, levelCoordinates[i][1]);
                ctx.lineTo(levelCoordinates[i+1][0] - this.bgX, levelCoordinates[i+1][1]);
                ctx.stroke();
            }
            ctx.fillStyle = "blue";
            ctx.fillRect(levelCoordinates[i][0] - this.bgX-20, levelCoordinates[i][1]-20, 40, 40);
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
        if (entityList[0].currentLevelIndex == 3) {
            loadGorGor();
        } else {
            loadGame();
        }
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
