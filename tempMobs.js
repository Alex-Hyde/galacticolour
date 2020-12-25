function Mob1(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-10, -2, 20, 4), new rectHitbox(-2, -10, 4, 20)]);
    Entity.call(this, x, y, angle, hitbox);
    this.initX = x;
    this.initY = y;

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        console.log(clock);
        this.x = this.initX + 500 * Math.sin(clock/400);
        this.y = this.initY + 20 * (Math.cos(clock/70) + Math.cos(clock/35));
    }
}

function Mob2(x, y, angle) {
    hitbox = new Hitbox([new rectHitbox(-20, -2, 40, 4), new rectHitbox(-2, -20, 4, 40)]);
    Entity.call(this, x, y, angle, hitbox);
    this.initX = x;
    this.initY = y;

    this.update = function() {
        d = new Date();
        clock = d.getTime();
        console.log(clock);
        this.x = this.initX + 500 * Math.sin(clock/400);
        this.y = this.initY + 60 * (Math.cos(4 * Math.sin(clock/200)));
        entityList.forEach(e => {
            if (e != this) {
                this.collision(e);
            }
        })
    }
}