function MobList() {
this.mobs = [];


this.update=function(){
    this.mobs.forEach(e => {
        e.update();
        mainplayer.projectiles.forEach(p =>{
        if (e.collision(p)){
           mobindex = this.mobs.indexOf(e);
           projectileindex = mainplayer.projectiles.indexOf(p);
           this.mobs.splice(mobindex,1);
           mainplayer.projectiles.splice(projectileindex,1);
        }
        });
    });  
}

this.draw = function(context){
    this.mobs.forEach(e => {
        e.draw(context);
        e.reset();
    });
}

this.reset = function(){

}
}