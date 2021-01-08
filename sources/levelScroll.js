asteroidTextures = [document.getElementById("asteroid1"), document.getElementById("asteroid2"), document.getElementById("asteroid3")];

function levelScroll(levelID, background, speed, endCoord) {
    this.background = background;
    this.bgX = 0;
    this.levelNum = levelID;
    this.speed = speed;
    this.invulnerable = 0;
    this.endCoord = endCoord;
    this.complete = false;
    this.doneTime = null;
    this.unlocked = false;
    this.audio = null;
    this.completeText = false;
    this.isAsteroid = true;

    this.loadLevel = function() {
        entityList.clear();
        player.spawn(100, 100, Math.PI/2);
        currentLevel = this.levelNum;
        entityList.other.push(this);
        this.reset();
        this.audio = new Audio('songs/battle_4.mp3');
        this.audio.volume = 0.3;
        this.audio.play();
    }

    this.reset = function() {
        this.bgX = 0;
        this.invulnerable = 0;
        this.completeText = false;
        this.doneTime = null;
    }

    this.levelClear = function() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.complete = true;
        currentLevel = NaN;
        levelList[this.levelNum].unlocked = true;
        loadLevelSelect(this.levelNum - 1);
    }

    this.update = function() {
        if (this.bgX >= this.endCoord + gameScreen.canvas.width) {
            refreshDate = new Date()
            time = refreshDate.getTime();
            if (!this.doneTime) {
                this.doneTime = time;
            }
            this.completeText = true;
            if (time - this.doneTime >= 5000) {
                this.levelClear();
            }
        }
        if (player.health <= 0) {
            currentLevel = NaN;
            this.audio.pause();
            this.audio.currentTime = 0;
            loadDeathScreen(this.levelNum - 1);
        }

        if (this.invulnerable) {
            this.invulnerable--;
        }
        this.bgX += this.speed;
        entityList.mobList.forEach(b => {
            b.x -= this.speed;
        });
        entityList.mobList.forEach(b => {
            if (!this.invulnerable && !player.dashing) {
                if (entityList.player.collision(b)) {
                    this.invulnerable = 60;
                    player.health -= 20;
                    player.hit = true;
                    new damageAnimation(entityList.player.x-50, entityList.player.y-50, 100, 100);
                }
            }
        });
        // this.blockList.forEach(b => {
        //     entityList.playerProjectiles.forEach(p => {
        //         if (b.collision(p)) {
        //             b.health -= 40;
        //             if (b.health <= 0) {
        //                 this.blockList.splice(this.blockList.indexOf(b), 1);
        //             }
        //             entityList.playerProjectiles.splice(entityList.playerProjectiles.indexOf(p), 1);
        //             explosionAnimation(p.x-20, p.y-20, 40, 40, 3);
        //         }
        //     });
        // });
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
        if (this.completeText) {
            ctx.textAlign = "center";
            ctx.font = "20px Courier";
            ctx.fillStyle = "white";
            ctx.fillText(`Level ${currentLevel} Complete`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
        }
    }

    this.levelClear = function() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.complete = true;
        currentLevel = NaN;
        levelList[this.levelNum].unlocked = true;
        loadLevelSelect(this.levelNum - 1);
    }
}

function levelScroll1(levelID) {
    background = document.getElementById("asteroidBG");
    // for (i = 0; i < 30; i++) {
    //     blockList.push(new Asteroid(Math.random()*1600+500, Math.random()*540 - 30, Math.random()*40 + 50, Math.random()*40 + 50, 
    //                                 Math.random()*Math.PI*2, Math.floor(Math.random()*2), (Math.random()-0.5)/5, Math.random()*4-2, Math.random()*4-2));
    // }
    levelScroll.call(this, levelID, background, 3, 5000);

    this.additionalUpdate = function() {
        if (this.bgX < this.endCoord - gameScreen.canvas.width && Math.random() < 0.05) {
            entityList.mobList.push(new Asteroid(gameScreen.canvas.width + 100, Math.random()*540 - 30, Math.random()*40 + 50, Math.random()*40 + 50, 
                                             Math.random()*Math.PI*2, Math.floor(Math.random()*3), (Math.random()-0.5)/5, Math.random()*4-2, Math.random()*4-2));
        }
        entityList.mobList.forEach(b => {
            if (b.x < -b.w) {
                entityList.mobList.splice(entityList.mobList.indexOf(b), 1);
            }
        });
    }
}

function Asteroid(x, y, w, h, angle, ind, spin, speedx, speedy) {
    this.health = 80;
    this.image = asteroidTextures[ind];
    Entity.call(this, x, y, angle, new Hitbox([new rectHitbox(-w/2, -h/2, w, h)]));
    this.w = w;
    this.h = h;
    this.spin = spin;
    this.speedx = speedx;
    this.speedy = speedy;
    this.imageZoom = 3/2;

    this.update = function() {
        this.angle += this.spin * player.playertime;
        this.x += this.speedx * player.playertime;
        this.y += this.speedy * player.playertime;
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
