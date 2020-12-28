function tracker(colour,x,y){
    bodyhitbox=new rectHitbox(-20,-20,40,40);
    thehitbox=new Hitbox([bodyhitbox]);
    this.image0=document.getElementById("yellowenemy");
    this.image1=document.getElementById("yellowenemy1");
    this.image2=document.getElementById("yellowenemy2");
    this.image3=document.getElementById("yellowenemy3");
    this.imageindex=0;
    this.delaytimer=0;
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image2,this.image1];
    enemy.call(this,40,40,x,y,0,thehitbox,2,colour,this.image0);

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
        }

    this.draw = function(ctx){
        console.log(this.images[this.imageindex % this.images.length]);
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.translate(-this.x, -this.y);
            ctx.drawImage(this.images[this.imageindex % this.images.length], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
            ctx.restore(); 
        }
}


///ADD TEXTURES FOR ALL COLOURS