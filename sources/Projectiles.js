function playerProjectile(angle,colour,x,y,damage,range,type){
    mainhitbox=new rectHitbox(-7.5,-17.5,15,35);
    fullhitbox= new Hitbox([mainhitbox]);
    this.initX = x;
    this.initY = y;
    this.range = range;
    this.type = type;
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
    projectile.call(this,35,15,angle,8,colour,x,y,fullhitbox,this.image,damage);

    this.update=function(){
        this.newPos();

        mobIndex = 0;
        entityList.mobList.forEach(mob => {
            projIndex = entityList.playerProjectiles.findIndex(p => p.projID == this.projID);
            if (mob.collision(this)) {
                if (this.type == 2) {
                    explosionAnimation(this.x-60, this.y-60, 120, 120);
                    mIndex = 0;
                    this.hitbox = new Hitbox([new rectHitbox(-60, -60, 120, 120)]);
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
