function playerProjectile(angle,colour,x,y){
    mainhitbox=new rectHitbox(17.5,7.5,35,15);
    fullhitbox= new Hitbox([mainhitbox]);
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
    projectile.call(this,35,15,angle,8,colour,x,y,fullhitbox,this.image,10);
}

//////MAKE PROJECTILES SHOOTSS