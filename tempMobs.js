function Mob1(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-10, -2, 20, 4), new rectHitbox(-2, -10, 4, 30)]);
    sinMoveMob.call(this, 20, 20, x, y, angle, hitbox, 100);

    this.newPos = function() {
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 40 * (Math.cos(this.offsetY + clock/300) + Math.cos(this.offsetY + clock/350)) + this.height/2;
    }
}

function Mob2(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, 75);

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

function Mob3(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -20, 40, 40)]);
    sinMoveMob.call(this, 40, 40, x, y, angle, hitbox, 140);

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

function sinMoveMob(width, height, x, y, angle, hitbox, maxHealth) {
    Entity.call(this, x + width/2, y + height/2, angle, hitbox);
    
    this.width = width;
    this.height = height;
    this.maxHealth = maxHealth;
    this.health = maxHealth;

    this.update = function() {
        this.newPos();
        d = new Date();
        clock = d.getTime();
        this.angle = getAngle(this.x, this.y, player.x, player.y);
        if (this.y > gameScreen.canvas.height) {
            this.initY = 5
        } else if (this.y < 0) {
            this.initY = gameScreen.canvas.height - 5
        }
    }
}