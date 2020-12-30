function Hitbox(shapeList) {
    // list of shapes, each with a coordinate relative to the center of the entity
    this.shapeList = shapeList;
    this.color = "grey";

    this.draw = function(ctx, parentEntity) {
        this.shapeList.forEach(s => {
            ctx.strokeStyle = this.color;
            s.draw(ctx, parentEntity.x, parentEntity.y, parentEntity.angle);
        });
        this.color = "white";
        ctx.strokeStyle = "black";
    }

    this.collision = function(hitbox, parentEntity1, parentEntity2) {
        collided = false;
        // check collision between any two shapes in each hitbox (nested foreach loop)
        this.shapeList.forEach(a => {
            hitbox.shapeList.forEach(b => {
                if (collision(a, b, parentEntity1, parentEntity2)) {
                    this.color = "red"; // change colour of hitbox when it is colliding with another entity
                    parentEntity2.hitbox.color = "red";
                    collided = true;
                    return;
                }
            });
        });
        return collided;
    }
}

// rectangular hitbox
// coordinates of the top left corner relative to the center of the entity
function rectHitbox(x, y, w, h) {
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

    // return coordinates of points relative to the top left of the canvas
    this.getAbsolutePoints = function(x, y, angle) {
        // coordinates relative to center of the parent entity
        relativePoints = this.getRelativePoints(angle);
        // adjust to position relative to canvas
        for (i = 0; i < 4; i++) {
            relativePoints[i][0] += x;
            relativePoints[i][1] += y;
        }
        return relativePoints;
    }
    // return coordinates relative to center of the parent entity (since coordinates (this.x, this.y) are stored as relative to the entity)
    this.getRelativePoints = function(angle) {
        return [rotatePoint(this.x, this.y, angle), rotatePoint(this.x + this.w, this.y, angle),
                rotatePoint(this.x + this.w, this.y + this.h, angle), rotatePoint(this.x, this.y + this.h, angle)];
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
    this.initX = x;
    this.initY = y;
    this.offsetX = Math.floor(Math.random()*10000);
    this.offsetY = Math.floor(Math.random()*10000);
    this.angle = angle;
    this.hitbox = hitbox; // hitbox object

    this.update = function() {
    }
    // function run at the end of every game loop for reseting variables
    this.reset = function() {
    }
    this.draw = function(ctx) {
        this.drawHitbox(ctx);
    }
    this.drawHitbox = function(ctx) {
        this.hitbox.draw(ctx, this);
    }
    // boolean function, true is there is a collision between the two entities, false otherwise
    this.collision = function(other) {
        return this.hitbox.collision(other.hitbox, this, other);
    }
    this.spawn = function() {
        entityList.mobList.push(this);
    }
    this.healthBar = function() {
        //console.log('h');
        length = 50;
        color = "green";
        if (this.health / this.maxHealth < 0.2) {
            length = 10;
            color = "red";
        } else if (this.health / this.maxHealth < 0.4) {
            length = 20;
            color = "orange";
        } else if (this.health / this.maxHealth < 0.6) {
            length = 30;
            color = "#FCCF03";
        } else if (this.health / this.maxHealth < 0.8) {
            length = 40;
            color = "#4CA832";
        }
        ctx = gameScreen.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x - 25, this.y - (20 + this.height/2), length, 5);
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

            // (<= 1) used as a tolerance for rounding error
            if (Math.abs(inter[0] - aP[0]) + Math.abs(inter[0] - aP2[0]) - Math.abs(aP[0] - aP2[0]) <= 1 &&
                Math.abs(inter[1] - aP[1]) + Math.abs(inter[1] - aP2[1]) - Math.abs(aP[1] - aP2[1]) <= 1 &&
                Math.abs(inter[0] - bP[0]) + Math.abs(inter[0] - bP2[0]) - Math.abs(bP[0] - bP2[0]) <= 1 &&
                Math.abs(inter[1] - bP[1]) + Math.abs(inter[1] - bP2[1]) - Math.abs(bP[1] - bP2[1]) <= 1) {
                return true;
            }
        }
    }

    // special case if one hitbox is fully inside the other hitbox
    // simply check if any one point is inside the other hitbox

    AB = subtractPoints(bPoints[1], bPoints[0]);
    AD = subtractPoints(bPoints[3], bPoints[0]);
    AP = subtractPoints(aPoints[0], bPoints[0]);
    if (0 < dot(AP, AB) && dot(AP, AB) < dot(AB, AB) && 0 < dot(AP, AD) && dot(AP, AD) < dot(AD, AD)) {return true;}
    AB = subtractPoints(aPoints[1], aPoints[0]);
    AD = subtractPoints(aPoints[3], aPoints[0]);
    AP = subtractPoints(bPoints[0], aPoints[0]);
    if (0 < dot(AP, AB) && dot(AP, AB) < dot(AB, AB) && 0 < dot(AP, AD) && dot(AP, AD) < dot(AD, AD)) {return true;}

    return false;
}

// dot product helper function
function dot([x1,y1],[x2,y2]) {
    return x1*x2 + y1*y2;
}

// subtract points helper function
function subtractPoints([x1,y1], [x2,y2]) {
    return [x1-x2,y1-y2];
}

// intersection between two lines in y-intercept form
function intTwoLines(x1, y1, a1, x2, y2, a2) {
    if (Math.abs(a1) == Math.PI/2) { // vertical slope
        m1 = 9999;
    } else {
        m1 = Math.tan(a1);
    }
    if (Math.abs(a2) == Math.PI/2) { // vertical slope
        m2 = 9999;
    } else {
        m2 = Math.tan(a2);
    }
    
    b1 = y1 - m1 * x1;
    b2 = y2 - m2 * x2;
    x = (b2 - b1)/(m1 - m2);
    y = m1 * x + b1;
    return [x,y];
}
