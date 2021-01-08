//Player Class
function Player(x,y,angle){
    headhitbox=new rectHitbox(-7,-25,14,25);
    bodyhitbox=new rectHitbox(-25,-15,50,35);
    fullhitbox=new Hitbox([headhitbox,bodyhitbox]);
    Entity.call(this,x,y,angle,fullhitbox);
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
    this.dashCooldown = 0;
    this.dashing = false;
    this.dashX = null;
    this.dashY = null;
    this.damagemultiplyer=1;
    this.playertime=1;
    this.bullettime=undefined;
    this.bullettimer=400;
    /////USE THIS TO SLOW GAME WHEN YOU PRESS SHIFT
    this.lastHitTime = 0;
    this.invulnTime = 1000;
    this.lowerBoundX = gameScreen.x + 35;
    this.upperBoundX = gameScreen.canvas.width - 35;
    this.lowerBoundY = gameScreen.y + 35;
    this.upperBoundY = gameScreen.canvas.height - 35;
    this.regen=false
    this.killregen=false
    this.example = false;

    // indices of inventory
    this.guns = [0, 0, 0, 0]; // red, purple, yellow, green
    this.body = 0;
    this.engine = 0;
    this.inventory = new PlayerInventory();

    this.update = function() {
        if(this.regen && this.health < this.maxHealth){
            this.health+= Math.min(0.01,this.maxHealth-this.health)
        }
        if (gameScreen.keys && gameScreen.keys[69] & this.bullettime==undefined){
            if(this.inventory.bodies[this.body].type==1){
                this.bullettime=true
                this.damagemultiplyer=5
                this.playertime=0.1
            }
        }
        if (gameScreen.keys && gameScreen.keys[16] & !this.dashCooldown){
            this.dashCooldown = 300 - this.inventory.engines[this.engine].cooldown;
            new portalAnimation(this.x - 100, this.y - 100, 200, 200);
            this.dashX = this.x + 250 * Math.sin(this.angle);
            this.dashY = this.y - 250 * Math.cos(this.angle);
            this.dashing = true;
        }
        if (this.dashCooldown) {
            this.dashCooldown--;
            if (300 - this.inventory.engines[this.engine].cooldown - this.dashCooldown > 30 && this.dashing) {
                this.x = this.dashX;
                this.y = this.dashY;
            }
        }
        if(this.bullettimer==0){
            this.bullettime=false
            this.damagemultiplyer=1
            this.playertime=1
        }
        this.healthBar();
        this.newPos();
        this.shoot();
        if (this.dashCooldown) {
            if (300 - this.inventory.engines[this.engine].cooldown - this.dashCooldown > 30 && this.dashing) {
                new portalAnimation(this.x - 100, this.y - 100, 200, 200);
                this.dashing = false;
            }
        }
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
        if(this.bullettime){
            this.bullettimer-=1
            this.bulletTimerBar(this.bullettimer)
        }
        if(this.dashCooldown){
            this.warpBar();
        }
        if (!this.dashing) {
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
    }
    this.newPos = function() {
        this.moveAngle = 0;
        var speedx = 0;
        var speedy = 0;
        if (gameScreen.keys && gameScreen.keys[65]) {speedx = -this.speed;}
        if (gameScreen.keys && gameScreen.keys[68]) {speedx = this.speed; }
        if (gameScreen.keys && gameScreen.keys[87]) {speedy= this.speed; }
        if (gameScreen.keys && gameScreen.keys[83]) {speedy= -this.speed; }
        if (speedx && speedy) {
            speedx /= root2;
            speedy /= root2;
        }
        this.angle = getAngle(this.x, this.y, gameScreen.x, gameScreen.y) + Math.PI/2;
        this.x += speedx
        this.y -= speedy

        if (this.x > this.upperBoundX && this.y > this.upperBoundY) {
            this.x = this.upperBoundX;
            this.y = this.upperBoundY;
        } else if (this.x > this.upperBoundX && this.y < this.lowerBoundY) {
            this.x = this.upperBoundX;
            this.y = this.lowerBoundY;
        } else if (this.x < this.lowerBoundX && this.y > this.upperBoundY) {
            this.x = this.lowerBoundX;
            this.y = this.upperBoundY;
        } else if (this.x < this.lowerBoundX && this.y < this.lowerBoundY) {
            this.x = this.lowerBoundX;
            this.y = this.lowerBoundY;
        }else if (this.x > this.upperBoundX) {
            this.x = this.upperBoundX;
        } else if (this.x < this.lowerBoundX) {
            this.x = this.lowerBoundX;
        } else if (this.y > this.upperBoundY) {
            this.y = this.upperBoundY;
        } else if (this.y < this.lowerBoundY) {
            this.y = this.lowerBoundY;
        }
    }
    this.shoot= function(){
        currentGunIndex = this.guns[this.colourindex % 4];
        currentGun = this.inventory.allGuns[this.colourindex % 4][currentGunIndex];
        if (!this.example || (this.example && gameScreen.x < 790 && gameScreen.y > 63)) {
            if (!this.shootCooldown && gameScreen.pressed && !this.dashing) {
                var shootAudio = new Audio('sounds/blast.mp3');
                shootAudio.play();
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
    }

    this.spawn = function(x, y, angle) {
        this.maxHealth = this.inventory.bodies[this.body].health
        this.health = this.maxHealth
        bodytype=this.inventory.bodies[this.body].type

        if(bodytype==0){
            this.regen=true;
        }
        if(bodytype==1){
            this.bullettime=undefined;
            this.bullettimer=400;
        }
        
        if(bodytype==2){
            this.damagemultiplyer=0.75;
        }
        if(bodytype==3){
            this.killregen=true;
        }
        this.speed = this.inventory.engines[this.engine].speed
        this.x = x;
        this.y = y;
        this.angle = angle;
        entityList.player = this;
    }
    this.bulletTimerBar = function(timer){
        ctx = gameScreen.context;
        ctx.fillStyle = "#17F5F0";
        ctx.drawImage(document.getElementById("BulletTimer"), 15, 50);
        ctx.fillRect(146,55,timer/2,10);
    }
    this.warpBar = function(){
        ctx = gameScreen.context;
        ctx.fillStyle = "#00ff50";
        ctx.drawImage(document.getElementById("warpCooldown"), 15, 80);
        ctx.fillRect(170,85,this.dashCooldown/(300-this.inventory.engines[this.engine].cooldown)*120,10);
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
        this.x += this.speed  * Math.cos(this.angle-Math.PI/2);
        this.y += this.speed  *  Math.sin(this.angle-Math.PI/2);
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
        this.x += this.speed *player.playertime * Math.cos(this.angle-Math.PI/2);
        this.y += this.speed *player.playertime * Math.sin(this.angle-Math.PI/2);
    }
}