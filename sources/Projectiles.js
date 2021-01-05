function playerProjectile(angle,colour,x,y,damage,range,type){
    mainhitbox=new rectHitbox(-17.5,-7.5,35,15);
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
                                m.health -= this.damage*3 * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));
                            }
                            else{
                                m.health -= this.damage * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));  
                            }
                            if (m.health <= 0) {
                                entityList.mobList.splice(mIndex, 1);
                            }
                        } else {
                            mIndex++;
                        }
                    });
                } else {
                    if (mob.colour==this.colour){
                        mob.health -= this.damage*3 * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));
                    }
                    else{
                        mob.health -= this.damage * Math.min(1, this.range/Math.sqrt((this.initX-this.x)*(this.initX-this.x)+(this.initY-this.y)*(this.initY-this.y)));  
                    }
                    if (mob.health <= 0) {
                        entityList.mobList.splice(mobIndex, 1);
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
            console.log("hit");
        //////insert player damage code here
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
            console.log("hit");
        //////insert player damage code here
        }
    }
}