function WinScreen() {
    this.image = document.getElementById("winBG");

    this.draw = function(ctx) {
        ctx.drawImage(this.image, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
    }

    this.update = function() {
        if (gameScreen.pressed) {
            loadLevelSelect(13);
        }
    }
}

function loadWinScreen() {
    entityList.clear();
    entityList.other.push(new WinScreen());
}