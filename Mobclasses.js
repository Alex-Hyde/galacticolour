function tracker(x,y, angle){
    bodyhitbox=new rectHitbox(-25,-25,50,50);
    thehitbox=new Hitbox([bodyhitbox]);

    this.imageindex=0;
    this.delaytimer=0;
    
    
    enemy.call(this,50,50,x,y,angle,thehitbox,2,this.image0, 50);//colour,this.image0);
 

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
    tracker.call(this,x,y, angle);
    this.colour = "yellow";
    this.image0=document.getElementById("yellowenemy");
    this.image1=document.getElementById("yellowenemy1");
    this.image2=document.getElementById("yellowenemy2");
    this.image3=document.getElementById("yellowenemy3");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image2,this.image1];
    
}
function purpleTracker(x,y, angle) {
    tracker.call(this,x,y, angle);
    this.colour = "purple";
    this.image0=document.getElementById("purplemob");
    this.image1=document.getElementById("purplemob1"); 
    this.images=[this.image0,this.image0,this.image1,this.image1];
}
function redTracker(x,y, angle) {
    tracker.call(this,x,y, angle);
    this.colour = "red";
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
    tracker.call(this,x,y, angle);
    this.colour = "green";
    this.image0=document.getElementById("greenmob");
    this.image1=document.getElementById("greenmob1");
    this.image2=document.getElementById("greenmob");
    this.image3=document.getElementById("greenmob3");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image2,this.image1];

}
///ADD TEXTURES FOR ALL COLOURS