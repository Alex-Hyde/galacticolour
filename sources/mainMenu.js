playInterval = null // setInterval(playAudio, menuscreenAudio.duration*1000, menuscreenAudio);

function MainMenu(bgCoord) {
    this.image = document.getElementById("menuBG");
    this.shipImage = document.getElementById("menuShipBG");
    this.x = bgCoord;

    this.zoomIndex = 0;
    this.zoomLength = 15;
    this.zoom = 0.12;
    this.w = gameScreen.canvas.width;
    this.h = gameScreen.canvas.height;
    this.scale = 1;
    this.zx = 0;
    this.zy = 0;
    
    
    gameScreen.context.save();
    this.update = function() {
        this.x += 0.5;
        this.x = this.x % 3000;
        if (this.zoomIndex > this.zoomLength) {
            loadLevelSelect(0);
            gameScreen.context.restore();
        }
    }
    this.draw = function(ctx) {
        if (this.zoomIndex) {
            zoom = Math.exp(this.zoom);
            ctx.translate(this.zx, this.zy);
            this.zx -= 480 / (this.scale*zoom) - 480 / this.scale;
            this.zy -= 310 / (this.scale*zoom) - 310 / this.scale;
            ctx.scale(zoom, zoom);
            ctx.translate(-this.zx, -this.zy);
            this.scale *= zoom;
            this.w = gameScreen.canvas.width / this.scale;
            this.h = gameScreen.canvas.height / this.scale;
            this.zoomIndex++;
        }
        ctx.drawImage(this.image, this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.x > 3000 -gameScreen.canvas.width) {
            ctx.drawImage(this.image, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 3000 - this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        }
        ctx.drawImage(this.shipImage, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
    }

    this.reset = function() {

    }
}

function PlayButton(x, y) {
    Button.call(this, x, y, 108*2, 85);
    this.defaultImage = document.getElementById("playButtonNew");
    this.hoverImage = document.getElementById("playButtonHoverNew");
    this.pressedImage = document.getElementById("playButtonPressedNew");
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
        new Audio('sounds/play.mp3').play();
        menuAudio.pause();
        playingAlready = false;
        //menuscreenAudio.currentTime = 0;
        clearInterval(playInterval);
        this.image = this.defaultImage;
        entityList.other[0].zoomIndex = 1;
    }
}
