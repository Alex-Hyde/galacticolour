function GorGorTheSpaceOgre() {
    this.x = 300;
    this.y = 300;
    this.w = 300;
    this.h = 300;
    this.angle = 0;
    this.health = 3000;
    this.defaultImage = document.getElementById("gorgor");
    this.smashImages = [document.getElementById("gorgorSmash1"), document.getElementById("gorgorSmash2"),
                          document.getElementById("gorgorSmash3"), document.getElementById("gorgorSmash4"), document.getElementById("gorgorSmash5"),
                          document.getElementById("gorgorSmash4"), document.getElementById("gorgorSmash3"),
                          document.getElementById("gorgorSmash2"), document.getElementById("gorgorSmash1")];
    console.log(this.smashImages);
    this.smash = false;
    this.smashIndex = 0;
    this.image = this.defaultImage;

    bodyHitbox = new Hitbox([new rectHitbox(-this.w/2-100, -this.h/2-100, this.w+200, this.h+200)]);
    heartHitbox = new Hitbox([new rectHitbox(-10, -10, 20, 20)]);

    this.dealDamageHitbox = [bodyHitbox];
    this.recieveDamageHitbox = [heartHitbox];

    this.allHitboxes = new Set(this.dealDamageHitbox.concat(this.recieveDamageHitbox));

    this.update = function() {
        if (this.health < 1000) {
            // low health mode
        } else if (this.health < 2000) {
            // medium health mode
        } else {
            if (gameScreen.clickedKeys[32]) {
                this.smash = true;
            }
            if (this.smash) {
                this.image = this.smashImages[this.smashIndex];
                this.smashIndex++;
                if (this.smashIndex == 9) {
                    this.smash = false;
                    this.smashIndex = 0;
                }
            } else {
                this.image = this.defaultImage;
            }
        }
    }

    this.draw = function(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);

        ctx.drawImage(this.image, this.x - this.w/2, this.y - this.h/2, this.w, this.h);

        ctx.restore();

        this.allHitboxes.forEach(h => {
            h.draw(ctx, this);
        });
    }

    this.reset = function() {

    }
}

function loadGorGor() {
    entityList = [];
    entityList[0] = new GorGorTheSpaceOgre();
}
