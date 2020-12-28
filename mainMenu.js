function MainMenu() {
    this.image = document.getElementById("menuBG");
    this.x = 0

    this.update = function() {
        this.x += 0.5;
        this.x = this.x % 3000;
    }
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.x > 3000 -gameScreen.canvas.width) {
            ctx.drawImage(this.image, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 3000 - this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        }
    }

    this.reset = function() {

    }
}

function PlayButton(x, y) {
    Button.call(this, x, y, 400, 100);
    this.defaultImage = document.getElementById("playButton");
    this.hoverImage = document.getElementById("playButtonHover");
    this.pressedImage = document.getElementById("playButtonPressed");
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
        this.image = this.defaultImage;
        loadLevelSelect();
    }
}
