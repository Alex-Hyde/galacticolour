function MobList() {
this.mobs = [];


this.update=function(){
    this.mobs.forEach(e => {
        e.update();
        player.projectiles.forEach(p =>{
        if (e.collision(p)){
           mobindex = this.mobs.indexOf(e);
           projectileindex = player.projectiles.indexOf(p);
           this.mobs.splice(mobindex,1);
           player.projectiles.splice(projectileindex,1);
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