//Player Class
function Player(x,y,angle){
    headhitbox=new rectHitbox(-7,-25,14,25);
    bodyhitbox=new rectHitbox(-25,-15,50,35);
    fullhitbox=new Hitbox([headhitbox,bodyhitbox]);
    Entity.call(this,x,y,angle,fullhitbox);
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.moveAngle=0;
    this.colourlist=["red","green","purple","yellow"];
    this.colourindex=0;
    this.greenship=document.getElementById("playergreen")
    this.purpleship=document.getElementById("playerpurple")
    this.redship=document.getElementById("playerred")
    this.yellowship=document.getElementById("playeryellow")
    this.spacebardown=false;
    this.shiptextures=[this.redship,this.greenship,this.purpleship,this.yellowship]; 

    this.update = function() {
        this.newPos();
        if(gameScreen.clicked){
            this.shoot();
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
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.shiptextures[this.colourindex % 4], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore();  
    }
    this.newPos = function() {
        this.moveAngle = 0;
        this.speed = 0;
        if (gameScreen.keys && gameScreen.keys[65]) {this.moveAngle = -5;}
        if (gameScreen.keys && gameScreen.keys[68]) {this.moveAngle = 5; }
        if (gameScreen.keys && gameScreen.keys[87]) {this.speed= 5; }
        if (gameScreen.keys && gameScreen.keys[83]) {this.speed= -5; }
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.shoot= function(){
        projsFired++;
        entityList.playerProjectiles.push(new playerProjectile(this.angle,this.colourlist[this.colourindex % 4],this.x,this.y))   
    }
}

//Projectile Parent Class
function projectile(height, width,angle, speed, colour, x, y,hitbox,image){
    Entity.call(this,x,y,angle,hitbox)
    this.projID=projsFired;
    this.height=height
    this.width=width
    this.speed=speed
    this.colour=colour  
    this.image=image

    this.newPos = function() {
        this.x += this.speed * Math.cos(this.angle-Math.PI/2);
        this.y += this.speed * Math.sin(this.angle-Math.PI/2);
    }
    this.update=function(){
        this.newPos();

        mobIndex = 1;
        entityList.mobList.slice(1).forEach(mob => {
            mobHit = false;
            projIndex = entityList.playerProjectiles.findIndex(p => p.projID == this.projID);
            if (mob.collision(this)) {
                mobHit = true;
                entityList.mobList.splice(mobIndex, 1);
                entityList.playerProjectiles.splice(projIndex, 1);
                levelList[currentLevel - 1].currentWave.enemiesKilled ++;
                console.log(levelList[currentLevel-1].currentWave.enemiesKilled);
            } else {
                mobIndex++;
            }
            
        })

        this.draw();
    }
    this.draw=function(){
        ctx = gameScreen.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

//Enemy parent Class
function enemy(width,height,x,y,angle,hitbox,speed, image) {//colour,image){
    Entity.call(this,x,y,angle,hitbox);
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.hitbox=hitbox;
    //this.colour=colour;
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