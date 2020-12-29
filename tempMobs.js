function Mob1(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-10, -2, 20, 4), new rectHitbox(-2, -10, 4, 20)]);
    Entity.call(this, x, y, angle, hitbox);

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000));
        this.y = this.initY + 40 * (Math.cos(clock/300) + Math.cos(clock/350));
    }
}

function Mob2(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 40)]);
    Entity.call(this, x, y, angle, hitbox);

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000));
        this.y = this.initY + 90 * (Math.cos(4 * Math.sin(clock/800)));
        entityList.mobProjectiles.forEach(e => {
            if (e != this) {
                this.collision(e);
            }
        })
    }
}

function Mob3(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -20, 40, 40)]);
    Entity.call(this, x, y, angle, hitbox);

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        this.x = this.initX + 500 * Math.tan(Math.sin(this.offsetX + clock/2000));
        this.y = this.initY + 500 * (Math.tan(Math.sin(clock/2000)));
        entityList.mobProjectiles.forEach(e => {
            if (e != this) {
                this.collision(e);
            }
        })
    }
}