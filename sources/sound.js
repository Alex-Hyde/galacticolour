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
        }
    }
}


var ambientAudio = new Audio('songs/ambient.mp3');
var menuAudio =  new Audio('songs/menuscreen_3.mp3');
menuAudio.loop = true;
menuAudio.volume = 0.3;
var winScreenAudio = new Audio('songs/winscreen.mp3');
winScreenAudio.loop = true;