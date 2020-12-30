function tracker(x,y, angle,colour){
    bodyhitbox=new rectHitbox(-25,-25,50,50);
    thehitbox=new Hitbox([bodyhitbox]);

    this.imageindex=0;
    this.delaytimer=0;
    this.istracker=true;
    
    enemy.call(this,50,50,x,y,angle,thehitbox,2,this.image0, 50,colour);
 

    this.track = function(targetx,targety){
        var deltax= this.x - targetx
        var deltay= this.y - targety
        var hypoteneuse= Math.sqrt((deltax**2)+(deltay**2));
        var speedfactor = this.speed/hypoteneuse
        this.x-= deltax*speedfactor
        this.y-= deltay*speedfactor
        }
    this.update = function() {
        this.delaytimer+=1
        if(this.delaytimer==10){
            this.delaytimer=1;
            this.imageindex+=1;
        }
        this.track(mainplayer.x,mainplayer.y);
        entityList.mobList.forEach(mob => {
            if (mob!=this && mob.istracker!==undefined){
                if(this.collision(mob)){
                    mobsdeltax=this.x-mob.x
                    mobsdeltay=this.y-mob.y
                    //PUSH THEM APART
                }
            }
            
        });
        this.healthBar();
    }

    this.draw = function(ctx){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.translate(-this.x, -this.y);
            ctx.drawImage(this.images[this.imageindex % this.images.length], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
            ctx.restore(); 
        }
    }


function yellowTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"yellow");
    this.image0=document.getElementById("yellowenemy");
    this.image1=document.getElementById("yellowenemy1");
    this.image2=document.getElementById("yellowenemy2");
    this.image3=document.getElementById("yellowenemy3");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image2,this.image1];
    
}
function purpleTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"purple");
    this.image0=document.getElementById("purplemob");
    this.image1=document.getElementById("purplemob1"); 
    this.images=[this.image0,this.image0,this.image1,this.image1];
}
function redTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"red");
    this.image0=document.getElementById("redmob");
    this.image1=document.getElementById("redmob1");
    this.image2=document.getElementById("redmob2");
    this.image3=document.getElementById("redmob3");
    this.image4=document.getElementById("redmob4");
    this.image5=document.getElementById("redmob5");
    this.image6=document.getElementById("redmob6");
    this.image7=document.getElementById("redmob7");
    this.image8=document.getElementById("redmob8");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image4,this.image5,this.image6,this.image7,this.image8];

}
function greenTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"green");
    this.image0=document.getElementById("greenmob");
    this.image1=document.getElementById("greenmob1");
    this.image2=document.getElementById("greenmob");
    this.image3=document.getElementById("greenmob3");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image2,this.image1];

}


function Tank(x,y,angle,colour,image,projectileimage){
    tankhitbox=new rectHitbox(-60,-32,120,80);
    fulltankhitbox= new Hitbox([tankhitbox]);
    this.projectileimage=projectileimage;
    this.shotprobability=0;
    enemy.call(this,128,128,x,y,angle,fulltankhitbox,2,image,500,colour);
    this.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore(); 
    }
    this.track = function(targetx,targety){
        var deltay= this.y - targety
        if (deltay > 0){
            this.y-=Math.max(this.speed,-deltay);
        }
        else{
            this.y+=Math.min(this.speed,-deltay); 
        }
        }
    this.update = function() {
        this.track(mainplayer.x,mainplayer.y);
        this.healthBar();
        this.shoot();
    }
    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new tankProjectile(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function redTank(x,y,angle){
    Tank.call(this,x,y,angle,"red",document.getElementById("redtank"),document.getElementById("redorb"));
}

function greenTank(x,y,angle){
    Tank.call(this,x,y,angle,"green",document.getElementById("greentank"),document.getElementById("greenorb"));
}

function purpleTank(x,y,angle){
    Tank.call(this,x,y,angle,"purple",document.getElementById("purpletank"),document.getElementById("purpleorb"));
}

function yellowTank(x,y,angle){
    Tank.call(this,x,y,angle,"yellow",document.getElementById("yellowtank"),document.getElementById("yelloworb"));
}

