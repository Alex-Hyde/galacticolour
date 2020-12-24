function Player1(x, y, angle, hitbox, gameScreen) {
    Entity.call(this, x, y, angle, hitbox);
    this.gameScreen = gameScreen

    this.update = function() {
        if (this.gameScreen.keys && this.gameScreen.keys[38]) {this.y -= 5;}
        if (this.gameScreen.keys && this.gameScreen.keys[37]) {this.x -= 5;}
        if (this.gameScreen.keys && this.gameScreen.keys[40]) {this.y += 5;}
        if (this.gameScreen.keys && this.gameScreen.keys[39]) {this.x += 5;}
        if (this.gameScreen.keys && this.gameScreen.keys[66]) {this.angle += 0.1;}

        if (this.collision(entityList[1])) {
        }
    }
}

function Player2(x, y, angle, hitbox, gameScreen) {
    Entity.call(this, x, y, angle, hitbox);
    this.gameScreen = gameScreen

    this.update = function() {
        if (this.gameScreen.keys && this.gameScreen.keys[87]) {this.y -= 2;}
        if (this.gameScreen.keys && this.gameScreen.keys[65]) {this.x -= 2;}
        if (this.gameScreen.keys && this.gameScreen.keys[83]) {this.y += 2;}
        if (this.gameScreen.keys && this.gameScreen.keys[68]) {this.x += 2;}
        if (this.gameScreen.keys && this.gameScreen.keys[67]) {this.angle += 0.1;}
    }
}
