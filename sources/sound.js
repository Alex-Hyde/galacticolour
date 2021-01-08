function playAudio(audio) {
    audio.currentTime = 0;
    audio.play();
}

var playingAlready = false;

function AudioButton() {
    Button.call(this, 800, 500, 30, 30);
    this.image = document.getElementById("audioButton");
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        if (!playingAlready) {
            loadMenu(entityList.other[0].x, true);
            //playInterval = setInterval(playAudio, menuAudio.duration*1000, menuAudio);
        }
    }
}


var ambientAudio = new Audio('songs/ambient.mp3');