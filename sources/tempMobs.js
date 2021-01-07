function PurpleSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 45)]);
    sinMoveMob.call(this, 40, 45, x, y, angle, hitbox, document.getElementById("purplesinmob"), 25, 'purple');
    this.newPos = function() {
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + gameclock/500)) + this.width/2;
        this.y = this.initY + 40 * (Math.cos(this.offsetY + gameclock/100) + Math.cos(this.offsetY + gameclock/1000)) + this.height/2;
    }
}

function YellowSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, document.getElementById("yellowsinmob"), 25, 'yellow');
    
    this.newPos = function() {
        this.x = this.initX + 500  * Math.tan(Math.sin(this.offsetX + gameclock/500)) + this.width/2;
        this.y = this.initY + 90  * (Math.cos(4 * Math.sin(this.offsetY + gameclock/300))) + this.height/2;
    }
}


function RedSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -20, 40, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, document.getElementById("redsinmob"), 25, 'red');

    this.newPos = function() {
        this.x = this.initX + 500  * Math.tan(Math.sin(this.offsetX + gameclock/500)) + this.width/2;
        this.y = this.initY + 100  * (Math.tan(Math.sin(this.offsetY + gameclock/500))) + this.height/2;
    
    }
}

function GreenSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -20, 40, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, document.getElementById("greensinmob"), 25, 'green');

    this.newPos = function() {
        this.x = this.initX + 500  * Math.tan(Math.sin(this.offsetX + gameclock/500)) + this.width/2;
        this.y = this.initY + 90  * (Math.cos(4 * Math.sin(this.offsetY + gameclock/300))) + this.height/2;
    }
}

function sinMoveMob(width, height, x, y, angle, hitbox, image, maxHealth, colour) {
    Entity.call(this, x + width/2, y + height/2, angle, hitbox);
    
    this.width = width;
    this.height = height;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.offsetX = Math.floor(Math.random()*10000);
    this.offsetY = Math.floor(Math.random()*10000);
    this.image = image;
    this.colour = colour;

    this.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore(); 
    }

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        if (clock - player.lastHitTime > player.invulnTime) {
            player.invuln = false;
            if (!player.invuln && player.collision(this) && player.health >= 0) {
                player.health -= 2.5;
                if(player.damagemultiplyer < 1){
                    this.health-=5;
                    if(this.health <= 0){
                        mobindex=entityList.mobList.indexOf(this);
                        entityList.mobList.splice(mobindex, 1);
                    }
                }
                player.invuln = true;
                player.lastHitTime = clock;
            }
        }
        this.newPos();
        this.angle = getAngle(this.x, this.y, player.x, player.y);
        if (this.y > gameScreen.canvas.height) {
            this.initY = 5
        } else if (this.y < 0) {
            this.initY = gameScreen.canvas.height - 5
        }
    }
}