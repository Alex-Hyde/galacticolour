//Player Class
function Player(x,y,angle){
    headhitbox=new rectHitbox(-7,-25,14,25);
    bodyhitbox=new rectHitbox(-25,-15,50,35);
    fullhitbox=new Hitbox([headhitbox,bodyhitbox]);
    Entity.call(this,x,y,angle,fullhitbox);
    this.maxHealth = 100;
    this.health = 100;
    this.width = 60;
    this.height = 60;
    this.speed = 5;
    this.moveAngle=0;
    this.colourlist=["red","purple","yellow", "green"];
    this.colourindex=0;
    this.greenship=document.getElementById("playergreen")
    this.purpleship=document.getElementById("playerpurple")
    this.redship=document.getElementById("playerred")
    this.yellowship=document.getElementById("playeryellow")
    this.spacebardown=false;
    this.shiptextures=[this.redship,this.purpleship,this.greenship,this.yellowship];
    this.shootCooldown = 0;
    this.invuln = false;
    this.lastHitTime = 0;
    this.invulnTime = 1000;

    // indices of inventory
    this.guns = [0, 0, 0, 0]; // red, purple, yellow, green
    this.body = 0;
    this.engine = 0;
    this.inventory = new PlayerInventory();

    this.update = function() {
        this.healthBar();
        this.newPos();
        this.shoot();
        if (gameScreen.keys && !gameScreen.keys[32] && this.spacebardown){
         this.spacebardown=false;
        }
       if(gameScreen.keys && gameScreen.keys[32] && this.spacebardown==false){
        this.colourindex+=1;
        this.spacebardown=true;
       }
       entityList.playerProjectiles=entityList.playerProjectiles.filter(i=> i.x < 960 && i.x >0 && i.y > 0 && i.y < 540);  
    }  
    this.draw =function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(glowBG[this.colourindex%4], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.drawImage(engines[player.inventory.engines[player.engine].type], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.drawImage(guns[player.inventory.allGuns[this.colourindex%4][player.guns[this.colourindex%4]].type], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.drawImage(bodies[player.inventory.bodies[player.body].type][this.colourindex%4], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore();  
    }
    this.newPos = function() {
        this.moveAngle = 0;
        var speedx = 0;
        var speedy = 0;
        if (gameScreen.keys && gameScreen.keys[65]) {speedx = -5;}
        if (gameScreen.keys && gameScreen.keys[68]) {speedx = 5; }
        if (gameScreen.keys && gameScreen.keys[87]) {speedy= 5; }
        if (gameScreen.keys && gameScreen.keys[83]) {speedy= -5; }
        if (speedx && speedy) {
            speedx /= root2;
            speedy /= root2;
        }
        this.angle = getAngle(this.x, this.y, gameScreen.x, gameScreen.y) + Math.PI/2;
        this.x += speedx
        this.y -= speedy
    }
    this.shoot= function(){
        currentGunIndex = this.guns[this.colourindex % 4];
        currentGun = this.inventory.allGuns[this.colourindex % 4][currentGunIndex];
        
        if (!this.shootCooldown && gameScreen.pressed) {
            projsFired++;
            if (currentGun.type == 3) {
                for (i = -2; i < 3; i++) {
                    entityList.playerProjectiles.push(new playerProjectile(this.angle + Math.PI/10 * i,this.colourlist[this.colourindex % 4],this.x,this.y,currentGun.damage,currentGun.range,currentGun.type));
                }
            } else {
                entityList.playerProjectiles.push(new playerProjectile(this.angle,this.colourlist[this.colourindex % 4],this.x,this.y,currentGun.damage,currentGun.range,currentGun.type));
            }
            this.shootCooldown = 1;
        } else if (this.shootCooldown) {
            this.shootCooldown++;
            if (this.shootCooldown > (60/(currentGun.firerate/60))) {
                this.shootCooldown = 0;
            }
        }
    }

    this.spawn = function(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        entityList.player = this;
    }
}

//Projectile Parent Class
function projectile(height, width,angle, speed, colour, x, y,hitbox,image,damage){
    Entity.call(this,x,y,angle,hitbox)
    this.projID=projsFired;
    this.height=height
    this.width=width
    this.damage=damage
    this.speed=speed
    this.colour=colour  
    this.image=image

    this.newPos = function() {
        this.x += this.speed * Math.cos(this.angle-Math.PI/2);
        this.y += this.speed * Math.sin(this.angle-Math.PI/2);
    }
    this.draw=function(){
        ctx = gameScreen.context;
        ctx.save();
        
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore();
    }
}

//Enemy parent Class
function enemy(width,height,x,y,angle,hitbox,speed, image, health,colour) {
    Entity.call(this,x,y,angle,hitbox);
    this.maxHealth = health;
    this.health = health;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.colour = colour;
    this.hitbox=hitbox;
    this.image=image;

    this.update = function() {
        this.newPos();
    }
    this.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore(); 
    }
    this.newPos = function() {
        this.x += this.speed * Math.cos(this.angle-Math.PI/2);
        this.y += this.speed * Math.sin(this.angle-Math.PI/2);
    }
}