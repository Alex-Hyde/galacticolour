function DeathScreen(ind=0) {
    this.image = document.getElementById("deathScreen");
    this.time = 300;
    this.ind = ind;

    this.draw = function(ctx) {
        ctx.drawImage(this.image, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        ctx.textAlign = "center";
        ctx.font = "50px Courier";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", gameScreen.canvas.width/2, gameScreen.canvas.height/2);
        ctx.globalAlpha = Math.max(0, this.time/100-2);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        ctx.globalAlpha = 1;
    }
    this.update = function() {
        this.time--;
        if (!this.time) {
            loadLevelSelect(this.ind);
        }
    }
}

function loadDeathScreen(ind) {
    entityList.clear();
    entityList.other.push(new DeathScreen(ind));
}