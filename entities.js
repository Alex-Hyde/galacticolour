//Player Class
function Player(x,y,angle){
    headhitbox=new rectHitbox(-7,-25,14,25);
    bodyhitbox=new rectHitbox(-25,-15,50,35);
    fullhitbox=new Hitbox([headhitbox,bodyhitbox]);
    Entity.call(x,y,anlgle,fullhitbox);
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.moveAngle=0;
    this.colourlist=["red","green","purple","yellow"];
    this.colourindex=0;
    this.greenship=new Image();
    this.greenship.src= 'shipgreen.png';
    this.purpleship=new Image();
    this.purpleship.src= 'shippurple.png';
    this.redship=new Image();
    this.redship.src= 'shipred.png';
    this.yellowship=new Image();
    this.yellowship.src= 'shipyellow.png';
    this.shiptextures=[this.redship,this.greenship,this.purpleship,this.yellowship]; 
    this.projectiles=[];

    this.updateplayer = function() {
    

        this.newPos();
        ctx = gameScreen.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.shiptextures[this.colourindex % 4], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore();   
    }  
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.shoot= function(){
        this.projectiles.push(new projectile(35, 15,this.angle,15,this.colourlist[this.colourindex % 4],this.x,this.y))   
    }
}

//Projectile Parent Class
function projectile(height, width, speed, colour, x, y,hitbox,colour,image){
    Entity.call(x,y,angle,hitbox)
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
        ctx = gameScreen.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.length);
        ctx.restore();
    }
}

//Enemy parent Class
function enemy(width,height,x,y,angle,hitbox,speed,colour,image){
    this.width = width;
    this.height = height;
    this.x=x;
    this.y=y;
    this.speed = speed;
    this.angle = angle;
    this.hitbox=hitbox;
    this.colour=colour;
    this.image=image;

    this.update = function() {
        this.newPos();
        ctx = gameScreen.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore();   
    }
}