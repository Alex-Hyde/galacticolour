function Level(waveList) {
    this.waveNumber = 0;
    this.currentWave = waveList[this.waveNumber];
    da = new Date();
    this.startTime = da.getTime();
    //this.spawnInterval = setInterval(this.currentWave.spawnEnemies, this.currentWave.spawnTime);

    this.update = function() {
        dt = new Date()
        clock = dt.getTime();
        console.log(entityList);
        console.log(this.currentWave.waveSpawnLimit);
        if (this.currentWave.enemiesSpawned != this.currentWave.waveSpawnLimit) {
            if ((clock-this.startTime) % this.currentWave.spawnTime < 15) {
                console.log("aa");
                this.currentWave.spawnEnemies();
            }
         } else if (this.currentWave.enemiesKilled == this.currentWave.enemiesSpawned) {
            if (!this.currentWave.waveDone) {
                d = new Date();
                t = d.getTime();
                console.log(t);
                entityList.splice(2, this.currentWave.enemiesSpawned);
                this.currentWave.doneTime = t;
                this.currentWave.waveDone = true;
            }
            d = new Date();
            ti = d.getTime();
            console.log(ti - this.currentWave.doneTime);
            this.waveClear(ti);
        }
    }
        
    this.waveClear = function(time) {
        ctx = gameScreen.context;
        ctx.textAlign = "center";
        ctx.font = "20px Courier";
        ctx.fillStyle = "black";
        if (time - this.currentWave.doneTime >= 5000) {
            if (this.waveNumber != waveList.length-1) {
                this.nextWave();
            } else {
                ctx.fillText("Game Over", gameScreen.canvas.width/2, gameScreen.canvas.height/2);
            }
        } else {
            console.log("waiting");
            ctx.fillText(`Wave ${this.waveNumber + 1} Completed.`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
            if (this.waveNumber != waveList.length-1){
                if (time - this.currentWave.doneTime >= 4000) {
                    ctx.fillText("Next Wave Starting in 1", gameScreen.canvas.width/2, gameScreen.canvas.height/2 + 50);
                } else if (time - this.currentWave.doneTime >= 3000) {
                    ctx.fillText("Next Wave Starting in 2", gameScreen.canvas.width/2, gameScreen.canvas.height/2 + 50);
                } else if (time - this.currentWave.doneTime >= 2000) {
                    ctx.fillText("Next Wave Starting in 3", gameScreen.canvas.width/2, gameScreen.canvas.height/2 + 50);
                }
            }
            // display text, wave num complete, etc.
        }
        
        // temporarily disable shooting
        // if waveNumber equals numWaves, trigger boss spawn
    }
    this.nextWave = function() {
        this.waveNumber ++;
        this.currentWave = waveList[this.waveNumber];
    //    this.startWave();
    }

    //this.startWave = function() {
    //    this.spawnInterval = setInterval(this.currentWave.spawnEnemies, this.currentWave.spawnTime);
    //}
    this.draw = function() {

    }
    this.reset = function() {

    }
}

function Wave(mobList, spawnLimit, spawnTime) {  // mobList is an association list with the type and number of spawns
    this.enemiesSpawned = 0;
    this.enemiesKilled = 0;
    this.waveSpawnLimit = spawnLimit;
    this.spawnTime = spawnTime;
    this.waveDone = false;
    this.doneTime = 0;
    
    this.spawnEnemies = function() {
        mobIndex = Math.floor(Math.random() * mobList.length);
        currentMob = mobList[mobIndex];
        console.log(currentMob);
        newMob = new currentMob[0](gameScreen.canvas.width/2, Math.random()*gameScreen.canvas.height, 0);
        newMob.spawn();
        currentMob[1]--;
        this.enemiesSpawned ++;
        this.enemiesKilled ++;
        if (currentMob[1] == 0) {
            mobList.splice(mobIndex, 1);
        }
    }
    

}
