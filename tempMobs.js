function Mob1(x, y, angle) {
    this.maxHealth = 100;
    this.health = 100;
    this.width = 20;
    this.height = 20;
    hitbox = new Hitbox([new rectHitbox(-10, -2, 20, 4), new rectHitbox(-2, -10, 4, 20)]);
    Entity.call(this, x + this.width/2, y + this.height/2, angle, hitbox);

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 40 * (Math.cos(clock/300) + Math.cos(clock/350)) + this.height/2;
    }
}

function Mob2(x, y, angle) {
    this.maxHealth = 75;
    this.health = 75;
    this.width = 40;
    this.height = 40;
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 40)]);
    Entity.call(this, x + this.width/2, y + this.height/2, angle, hitbox);

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 90 * (Math.cos(4 * Math.sin(clock/800))) + this.height/2;
        //entityList.mobProjectiles.forEach(e => {
        //    if (e != this) {
        //        this.collision(e);
        //    }
        //})
    }
}

function Mob3(x, y, angle) {
    this.maxHealth = 140;
    this.health = 140;
    this.width = 40;
    this.height = 40;
    hitbox = new Hitbox([new rectHitbox(-20, -20, 40, 40)]);
    Entity.call(this, x + this.width/2, y + this.height/2, angle, hitbox);

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000)) + this.width/2;
        this.y = this.initY + 500 * (Math.tan(Math.sin(clock/2000))) + this.height/2;
        //entityList.mobProjectiles.forEach(e => {
        //    if (e != this) {
        //        this.collision(e);
        //    }
        //})
    }
}