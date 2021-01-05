function PurpleSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 45)]);
    sinMoveMob.call(this, 40, 45, x, y, angle, hitbox, document.getElementById("purplesinmob"), 10, 'purple');
    this.newPos = function() {
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 40 * (Math.cos(this.offsetY + clock/300) + Math.cos(this.offsetY + clock/350)) + this.height/2;
    }
}

function YellowSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, document.getElementById("yellowsinmob"), 15, 'yellow');

    this.newPos = function() {
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 90 * (Math.cos(4 * Math.sin(this.offsetY + clock/800))) + this.height/2;
        //entityList.mobProjectiles.forEach(e => {
        //    if (e != this) {
        //        this.collision(e);
        //    }
        //})
    }
}

function RedSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -20, 40, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, document.getElementById("redsinmob"), 10, 'red');

    this.newPos = function() {
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 100 * (Math.tan(Math.sin(this.offsetY + clock/2000))) + this.height/2;
        //entityList.mobProjectiles.forEach(e => {
        //    if (e != this) {
        //        this.collision(e);
        //    }
        //})
    }
}

function GreenSinMob(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -20, 40, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, document.getElementById("greensinmob"), 10, 'green');

    this.newPos = function() {
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 500 * (Math.tan(Math.sin(this.offsetY + clock/2000))) + this.height/2;
        //entityList.mobProjectiles.forEach(e => {
        //    if (e != this) {
        //        this.collision(e);
        //    }
        //})
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
                player.health -= 5;
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