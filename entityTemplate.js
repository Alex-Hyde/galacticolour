function Hitbox(shapeList) {
    // list of shapes, each with a coordinate relative to the center of the entity
    this.shapeList = shapeList;

    this.draw = function(ctx, parentEntity) {
        this.shapeList.forEach(s => {
            s.draw(ctx, parentEntity.x, parentEntity.y, parentEntity.angle);
        });
    }

    this.collision = function(hitbox, parentEntity1, parentEntity2) {
        this.shapeList.forEach(a => {
            hitbox.shapeList.forEach(b => {
                if (collision(a, b, parentEntity1, parentEntity2));
            });
        });
    }
}

// rectangular hitbox
// coordinates of the top left corner relative to the center of the entity
function rectHitbox(x, y, w, h) {
    this.type = "rect";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.draw = function(ctx, x, y, angle) {
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.translate(-x, -y);

        ctx.strokeRect(x + this.x, y + this.y, this.w, this.h);

        ctx.restore();
    }

    this.getAbsolutePoints = function(x, y, angle) {
        relativePoints = [rotatePoint(this.x, this.y, angle), rotatePoint(this.x + this.w, this.y, angle),
                          rotatePoint(this.x + this.w, this.y + this.h, angle), rotatePoint(this.x, this.y + this.h, angle)];
        for (i = 0; i < 4; i++) {
            relativePoints[i][0] += x;
            relativePoints[i][1] += y;
        }
        return relativePoints;
    }
}

// helper function for getting absolute position of points of rect hitbox
function rotatePoint(x, y, angle) {
    // reduce calculation time by only calculating cos/sin once
    cosa = Math.cos(-angle);
    sina = Math.sin(-angle);
    return [y*sina + x*cosa, y*cosa - x*sina];
}

// parent class for all entities
function Entity(x, y, angle, hitbox) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.hitbox = hitbox;

    this.update = function() {}

    this.draw = function(ctx) {
        this.drawHitbox(ctx);
    }

    this.drawHitbox = function(ctx) {
        this.hitbox.draw(ctx, this);
    }

    this.collision = function(other) {
        this.hitbox.collision(other.hitbox, this, other);
    }
}

// collision between two hitboxes
function collision(a, b, parentEntity1, parentEntity2) {
    // collision between two rectangles
    aPoints = a.getAbsolutePoints(parentEntity1.x, parentEntity1.y, parentEntity1.angle);
    bPoints = b.getAbsolutePoints(parentEntity2.x, parentEntity2.y, parentEntity2.angle);

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {

            aP = aPoints[i];
            aP2 = aPoints[(i+1)%4];
            bP = bPoints[j]
            bP2 = bPoints[(j+1)%4];

            inter = intTwoLines(aP[0], aP[1], parentEntity1.angle + i*Math.PI/2, bP[0], bP[1], parentEntity2.angle + j*Math.PI/2);

            // (< 1) used as a tolerance for rounding error
            if (Math.abs(inter[0] - aP[0]) + Math.abs(inter[0] - aP2[0]) - Math.abs(aP[0] - aP2[0]) < 1 &&
                Math.abs(inter[1] - aP[1]) + Math.abs(inter[1] - aP2[1]) - Math.abs(aP[1] - aP2[1]) < 1 &&
                Math.abs(inter[0] - bP[0]) + Math.abs(inter[0] - bP2[0]) - Math.abs(bP[0] - bP2[0]) < 1 &&
                Math.abs(inter[1] - bP[1]) + Math.abs(inter[1] - bP2[1]) - Math.abs(bP[1] - bP2[1]) < 1) {
                gameScreen.context.fillStyle = "blue";
                gameScreen.context.fillRect(inter[0]-2, inter[1]-2, 4, 4);
            }
        }
    }
}

// intersection between two lines in y-intercept form
function intTwoLines(x1, y1, a1, x2, y2, a2) {
    m1 = Math.tan(a1);
    m2 = Math.tan(a2);
    b1 = y1 - m1 * x1;
    b2 = y2 - m2 * x2;
    x = (b2 - b1)/(m1 - m2);
    y = m1 * x + b1;
    return [x,y];
}
