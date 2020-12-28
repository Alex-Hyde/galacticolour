function Player1(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, 0, 40, 20), new rectHitbox(-5, -20, 10, 20), new rectHitbox(-15, -10, 5, 10), new rectHitbox(10, -10, 5, 10)]);
    Entity.call(this, x, y, angle, hitbox);

    this.update = function() {
        if (gameScreen.keys && gameScreen.keys[38]) {this.y -= 5;}
        if (gameScreen.keys && gameScreen.keys[37]) {this.x -= 5;}
        if (gameScreen.keys && gameScreen.keys[40]) {this.y += 5;}
        if (gameScreen.keys && gameScreen.keys[39]) {this.x += 5;}
        if (gameScreen.keys && gameScreen.keys[66]) {this.angle += 0.1;}

        //if (this.collision(entityList[1])) {
        //}
    }
}

function Player2(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-10, -15, 100,100)]);
    Entity.call(this, x, y, angle, hitbox);

    this.update = function() {
        if (gameScreen.keys && gameScreen.keys[87]) {this.y -= 2;}
        if (gameScreen.keys && gameScreen.keys[65]) {this.x -= 2;}
        if (gameScreen.keys && gameScreen.keys[83]) {this.y += 2;}
        if (gameScreen.keys && gameScreen.keys[68]) {this.x += 2;}
        if (gameScreen.keys && gameScreen.keys[67]) {this.angle += 0.1;}
    }
}

function PlayButton(x, y) {
    Button.call(this, x, y, 100, 100);
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
        loadGame()
        //levelList[0].loadLevel();
    }
}
