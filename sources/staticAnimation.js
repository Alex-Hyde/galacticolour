// animation that stays in one position on the screen
function staticAnimation(imageList, x, y, w, h, delay = 1, cycles = 1, back = false) {
    this.imageList = imageList;
    this.delay = delay;
    this.index = 0;
    this.cycles = cycles;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.back = back;
    if (back) {
        entityList.staticTexturesBack.push(this);
    } else {
        entityList.staticTextures.push(this);
    }

    this.draw = function(ctx) {
        if (this.index/this.delay < this.imageList.length) {
            ctx.drawImage(this.imageList[Math.floor(this.index/this.delay)], x, y, w, h);
            this.index++;
        } else if(this.cycles != 1) {
            this.cycles--;
            this.index = 0;
        } else {
            if (this.back) {
                var index = entityList.staticTexturesBack.indexOf(this);
                if (index != -1) {
                    entityList.staticTexturesBack.splice(index, 1);
                }
            } else {
                var index = entityList.staticTextures.indexOf(this);
                if (index != -1) {
                    entityList.staticTextures.splice(index, 1);
                }
            }
        }
    }
}

function explosionAnimation(x, y, w, h, delay = 5, cycles = 1) {
    var imageList = [document.getElementById("explosion1"), document.getElementById("explosion2"), document.getElementById("explosion1")];
    staticAnimation.call(this, imageList, x, y, w, h, delay, cycles);
}

function portalAnimation(x, y, w, h, delay = 5, cycles = 1) {
    var imageList = [document.getElementById("portal1"), document.getElementById("portal2"), document.getElementById("portal3"),
                     document.getElementById("portal2"), document.getElementById("portal1")];
    staticAnimation.call(this, imageList, x, y, w, h, delay, cycles, true);
}