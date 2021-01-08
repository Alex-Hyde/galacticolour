function playerProjectile(angle,colour,x,y,damage,range,type){
    this.initX = x;
    this.initY = y;
    this.range = range;
    this.type = type;
    if(type==0){
        if (colour=="yellow"){
            this.image=document.getElementById("yellowrocket")
        }
        if (colour=="red"){
            this.image=document.getElementById("redrocket")
        }
        if (colour=="green"){
            this.image=document.getElementById("greenrocket")
        }
        if (colour=="purple"){
            this.image=document.getElementById("purplerocket")
        }
        width=15
        height=35
        mainhitbox=new rectHitbox(-7.5,-17.5,15,35);
        fullhitbox= new Hitbox([mainhitbox]);
    }
    if(type==1){
        if (colour=="yellow"){
            this.image=document.getElementById("yellowlaser")
        }
        if (colour=="red"){
            this.image=document.getElementById("redlaser")
        }
        if (colour=="green"){
            this.image=document.getElementById("greenlaser")
        }
        if (colour=="purple"){
            this.image=document.getElementById("purplelaser")
        }
        width=10
        height=20
        mainhitbox=new rectHitbox(-5,-10,10,20);
        fullhitbox= new Hitbox([mainhitbox]);
    }

    if(type==2){
        if (colour=="yellow"){
            this.image=document.getElementById("yellowrocket1")
        }
        if (colour=="red"){
            this.image=document.getElementById("redrocket1")
        }
        if (colour=="green"){
            this.image=document.getElementById("greenrocket1")
        }
        if (colour=="purple"){
            this.image=document.getElementById("purplerocket1")
        }
        width=20
        height=80
        mainhitbox=new rectHitbox(-8,-35,16,70);
        fullhitbox= new Hitbox([mainhitbox]);
    }

    if(type==3){
        if (colour=="yellow"){
            this.image=document.getElementById("yellowshell")
        }
        if (colour=="red"){
            this.image=document.getElementById("redshell")
        }
        if (colour=="green"){
            this.image=document.getElementById("greenshell")
        }
        if (colour=="purple"){
            this.image=document.getElementById("purpleshell")
        }
        width=10
        height=20
        mainhitbox=new rectHitbox(-5,-10,10,20);
        fullhitbox= new Hitbox([mainhitbox]);
    }
    projectile.call(this,height,width,angle,8,colour,x,y,fullhitbox,this.image,damage);

    this.update=function(){
        this.newPos();

        mobIndex = 0;
        entityList.mobList.forEach(mob => {
            projIndex = entityList.playerProjectiles.findIndex(p => p.projID == this.projID);
            if (mob.collision(this)) {
                var explosionAudio = new Audio('sounds/explosion.mp3');
                explosionAudio.volume = 0.3;
                explosionAudio.play();
                if (this.type == 2) {
                    new explosionAnimation(this.x-100, this.y-100, 200, 200);
                    mIndex = 0;
                    this.hitbox = new Hitbox([new rectHitbox(-100, -100, 200, 200)]);
                    entityList.mobList.forEach(m => {
                        if (m.collision(this)) {
                            if (m.colour==this.colour){
                                m.health -= this.damage* 3 * player.damagemultiplyer * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));
                            }
                            else{
                                m.health -= this.damage * player.damagemultiplyer * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));  
                            }
                            if (m.health <= 0) {
                                entityList.mobList.splice(mIndex, 1);
                                if(player.killregen && player.health < player.maxHealth){
                                    player.health+=Math.min(m.maxHealth*0.03,player.maxHealth-player.health)
                                }
                            }
                        } else {
                            mIndex++;
                        }
                    });
                } else {
                    if (mob.colour==this.colour){
                        mob.health -= this.damage* 3 * player.damagemultiplyer  * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));
                    }
                    else{
                        mob.health -= this.damage * player.damagemultiplyer * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));  
                    }
                    if (mob.health <= 0) {
                        entityList.mobList.splice(mobIndex, 1);
                        if(player.killregen && player.health < player.maxHealth){
                            player.health+=Math.min(mob.maxHealth*0.03,player.maxHealth-player.health)
                        }
                    }
                }
                entityList.playerProjectiles.splice(projIndex, 1);
                return
            } else {
                mobIndex++;
            }
            
        })

        this.draw();
    }
}

function tankProjectile(x,y,colour,image){
    tankprojhitbox=new rectHitbox(-32,-32,64,64);
    fulltankprojectilehitbox= new Hitbox([tankprojhitbox]);
    projectile.call(this,64,64,-Math.PI/2,8,colour,x,y,fulltankprojectilehitbox,image,50);
    
    this.update = function(){
        this.newPos();
        this.draw();
        if(this.collision(player)){
            player.health-=10;
            projectileindex=entityList.mobProjectiles.indexOf(this);
            entityList.mobProjectiles.splice(projectileindex,1);
        }
        if(this.x < -50 || this.x >1000 || this.y < -50 || this.y > 600){
            projectileindex=entityList.mobProjectiles.indexOf(this);
            entityList.mobProjectiles.splice(projectileindex,1);
        }
    }
    this.newPos = function() {
        this.x += this.speed *player.playertime * Math.cos(this.angle-Math.PI/2);
        this.y += this.speed *player.playertime  *  Math.sin(this.angle-Math.PI/2);
    }
}

function lefttankProjectile(x,y,colour,image){
    tankprojhitbox=new rectHitbox(-32,-32,64,64);
    fulltankprojectilehitbox= new Hitbox([tankprojhitbox]);
    projectile.call(this,64,64,-Math.PI/2,-8,colour,x,y,fulltankprojectilehitbox,image,50);
    
    this.update = function(){
        this.newPos();
        this.draw();
        if(this.collision(player)){
            player.health-=10;
            projectileindex=entityList.mobProjectiles.indexOf(this);
            entityList.mobProjectiles.splice(projectileindex,1);
        }
        if(this.x < -50 || this.x >1000 || this.y < -50 || this.y > 600){
            projectileindex=entityList.mobProjectiles.indexOf(this);
            entityList.mobProjectiles.splice(projectileindex,1);
        }
    }
    this.newPos = function() {
        this.x += this.speed *player.playertime * Math.cos(this.angle-Math.PI/2);
        this.y += this.speed *player.playertime  *  Math.sin(this.angle-Math.PI/2);
    }
}

function tanknuke(x,y,colour,image){
    tankProjectile.call(this,x,y,colour,image);
    this.hitbox= new Hitbox([new rectHitbox(-15,-26.25,30,52.5)]);
    this.width=30;
    this.height=52.5;
}

function lefttanknuke(x,y,colour,image){
    lefttankProjectile.call(this,x,y,colour,image);
    this.hitbox= new Hitbox([new rectHitbox(-15,-26.25,30,52.5)]);
    this.width=30;
    this.height=52.5;
}
