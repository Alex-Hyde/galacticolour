asteroidTextures = [document.getElementById("asteroid1"), document.getElementById("asteroid2"), document.getElementById("asteroid3")];

function levelScroll(blockList, levelID, background, speed, endCoord) {
    this.background = background;
    this.bgX = 0;
    this.blockList = blockList; // hitboxes
    this.levelID = levelID;
    this.speed = speed;
    this.invulnerable = 0;
    this.endCoord = endCoord;
    this.complete = false;

    this.loadLevel = function() {
        entityList.clear();
        player.spawn(100, 100, Math.PI/2);
        entityList.other.push(this);
        this.reset();
    }

    this.reset = function() {
        this.bgX = 0;
        this.invulnerable = 0;
        this.blockList = [];
    }

    this.update = function() {
        if (this.bgX >= this.endCoord + gameScreen.canvas.width) {
            this.levelClear();
            return;
        }

        if (this.invulnerable) {
            this.invulnerable--;
        }
        this.bgX += this.speed;
        this.blockList.forEach(b => {
            b.x -= this.speed;
            b.update();
        });
        if (!this.invulnerable) {
            this.blockList.forEach(b => {
                if (entityList.player.collision(b)) {
                    this.invulnerable = 60;
                    explosionAnimation(entityList.player.x-50, entityList.player.y-50, 100, 100);
                }
            });
        }
        this.blockList.forEach(b => {
            entityList.playerProjectiles.forEach(p => {
                if (b.collision(p)) {
                    b.health -= 40;
                    if (b.health <= 0) {
                        this.blockList.splice(this.blockList.indexOf(b), 1);
                    }
                    entityList.playerProjectiles.splice(entityList.playerProjectiles.indexOf(p), 1);
                    explosionAnimation(p.x-20, p.y-20, 40, 40, 3);
                }
            });
        });
        entityList.staticTextures.forEach(e => {
            e.x -= this.speed;
        });

        this.additionalUpdate();
    }

    this.additionalUpdate = function() {

    }

    this.draw = function(ctx) {
        ctx.drawImage(this.background, this.bgX%2000, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.bgX%2000 > 2000 -gameScreen.canvas.width) {
            ctx.drawImage(this.background, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 2000 - this.bgX%2000, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        }

        this.blockList.forEach(b => {
            b.draw(ctx);
        });
    }

    this.levelClear = function() {
        this.complete = true;
        loadLevelSelect();
    }
}

function levelScroll1(levelID) {
    background = document.getElementById("asteroidBG");
    blockList = [];
    // for (i = 0; i < 30; i++) {
    //     blockList.push(new Asteroid(Math.random()*1600+500, Math.random()*540 - 30, Math.random()*40 + 50, Math.random()*40 + 50, 
    //                                 Math.random()*Math.PI*2, Math.floor(Math.random()*2), (Math.random()-0.5)/5, Math.random()*4-2, Math.random()*4-2));
    // }
    levelScroll.call(this, blockList, levelID, background, 3, 5000);

    this.additionalUpdate = function() {
        if (this.bgX < this.endCoord - gameScreen.canvas.width && Math.random() < 0.05) {
            this.blockList.push(new Asteroid(gameScreen.canvas.width + 100, Math.random()*540 - 30, Math.random()*40 + 50, Math.random()*40 + 50, 
                                             Math.random()*Math.PI*2, Math.floor(Math.random()*3), (Math.random()-0.5)/5, Math.random()*4-2, Math.random()*4-2));
        }
        this.blockList.forEach(b => {
            if (b.x < -b.w) {
                this.blockList.splice(this.blockList.indexOf(b), 1);
            }
        });
    }
}

function Asteroid(x, y, w, h, angle, ind, spin, speedx, speedy) {
    this.health = 100;
    this.image = asteroidTextures[ind];
    Entity.call(this, x, y, angle, new Hitbox([new rectHitbox(-w/2, -h/2, w, h)]));
    this.w = w;
    this.h = h;
    this.spin = spin;
    this.speedx = speedx;
    this.speedy = speedy;
    this.imageZoom = 3/2;

    this.update = function() {
        this.angle += this.spin;
        this.x += this.speedx;
        this.y += this.speedy;
        if (this.y > gameScreen.canvas.height + this.h*this.imageZoom) {
            this.y = -this.h*this.imageZoom;
        } else if (this.y < -this.h*this.imageZoom) {
            this.y = gameScreen.canvas.height + this.h*this.imageZoom;
        }
    }

    this.draw = function(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.imageZoom*this.w/2, this.y-this.imageZoom*this.h/2, this.imageZoom*this.w, this.imageZoom*this.h);

        ctx.restore();
    }
}
