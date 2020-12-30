function Level(waveList, levelID) {
    this.levelNum = levelID;
    this.waveNumber = 0;
    this.initWaveList = waveList.map(wave => wave);
    this.waveList = waveList;
    this.currentWave = this.waveList[this.waveNumber];
    this.complete = false;
    this.backgroundImg = document.getElementById("space");
    this.bgImgX = 0;
    this.bgImgY = 0;
    //this.spawnInterval = setInterval(this.currentWave.spawnEnemies, this.currentWave.spawnTime);

    this.loadLevel = function() { //.slice(0,2);   // make empty in actual game
        entityList.clear();
        player.spawn(gameScreen.canvas.width/2, gameScreen.canvas.height/2, 0);
        this.waveList = this.initWaveList.map(wave=>wave);
        this.waveNumber = 0;
        //entityList.mobList = entityList.mobList.slice(entityList.mobList.length-1, entityList.mobList.length); // or just clear list but this puts new spawned player in same pos as existing
        //globalMobList = []
        this.waveList.forEach(wave => {
            wave.resetWave();
        })
        startDate = new Date();
        this.startTime = startDate.getTime();
        currentLevel = levelList.findIndex(l => l.levelNum == this.levelNum) + 1;
        //console.log(currentLevel);
    }
    
    this.update = function() {
        refreshDate = new Date()
        clock = refreshDate.getTime();
        this.bgImgX = player.x / 10;
        this.bgImgY = player.y / 10;
        //console.log(entityList);
        //console.log(this.currentWave.waveSpawnLimit);
        //console.log(clock);
        ctx = gameScreen.context;
        ctx.drawImage(this.backgroundImg, this.bgImgX, this.bgImgY, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        ctx.font = "13px Courier";
        ctx.fillStyle = "white";
        ctx.fillText("Press Esc to Exit Level", 100, 20);
        if (gameScreen.keys && gameScreen.keys[27]) {
            this.clearMobs();
            currentLevel = NaN;
            loadLevelSelect();
        }
        if (clock - this.startTime < 3000) {
            ctx.textAlign = "center";
            ctx.font = "20px Courier";
            ctx.fillStyle = "white";
            if (this.complete) {
                ctx.fillText(`Level ${currentLevel} has already been compeleted.`, gameScreen.canvas.width/2, gameScreen.canvas.height/2 + 50);
            }
            if (clock - this.startTime >= 2000) {
                ctx.fillText(`Level ${currentLevel} Starting in 1`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
            } else if (clock - this.startTime >= 1000) {
                ctx.fillText(`Level ${currentLevel} Starting in 2`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
            } else {
                ctx.fillText(`Level ${currentLevel} Starting in 3`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
            }
        } else if (this.currentWave.enemiesSpawned != this.currentWave.waveSpawnLimit) {
            if ((clock-this.startTime) % this.currentWave.spawnTime < 15) {
                //console.log("mobspawn");
                this.currentWave.spawnEnemies();
            }
        } else if (this.currentWave.enemiesKilled == this.currentWave.enemiesSpawned) {
            if (!this.currentWave.waveDone) {
                d = new Date();
                t = d.getTime();
                //console.log(t);
                this.clearMobs();
                this.currentWave.doneTime = t;
                this.currentWave.waveDone = true;
            }
            d = new Date();
            ti = d.getTime();
            //console.log(ti - this.currentWave.doneTime);
            this.waveClear(ti);
        }
    }
        
    this.waveClear = function(time) {
        ctx.textAlign = "center";
        ctx.font = "20px Courier";
        ctx.fillStyle = "white";
        if (time - this.currentWave.doneTime >= 5000) {
            if (this.waveNumber != this.waveList.length-1) {
                this.nextWave();
            } else {
                ctx.fillText(`Level ${currentLevel} Complete`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
                if (time-this.currentWave.doneTime >= 8000) {
                    this.levelClear();
                }
            }
        } else {
            //console.log("waiting");
            ctx.fillText(`Wave ${this.waveNumber + 1} Completed.`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
            if (this.waveNumber != this.waveList.length-1){
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

    this.levelClear = function() {
        this.complete = true;
        currentLevel = NaN;
        loadLevelSelect();
    }

    this.clearMobs = function() {
        entityList.mobList.splice(2, this.currentWave.enemiesSpawned);
    }

    this.nextWave = function() {
        this.waveNumber ++;
        this.currentWave = this.waveList[this.waveNumber];
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
    this.initMobList = mobList.map(mob => mob);
    this.mList = mobList;
    this.enemiesSpawned = 0;
    this.enemiesKilled = 0;
    this.waveSpawnLimit = spawnLimit;
    this.spawnTime = spawnTime;
    this.waveDone = false;
    this.doneTime = 0;
    
    this.resetWave =function() {
        this.mList = this.initMobList.map(mob=>mob);
        this.enemiesSpawned = 0;
        this.enemiesKilled = 0;
        this.waveDone = false;
        this.doneTime = 0;
    }
    this.spawnEnemies = function() {
        mobIndex = Math.floor(Math.random() * this.mList.length);
        offsetX = Math.floor(Math.random()*100);
        currentMob = mobList[mobIndex];
        //newMob = new currentMob[0]("yellow", gameScreen.canvas.width/2, Math.random()*gameScreen.canvas.height);
        newMob = new currentMob[0](offsetX + gameScreen.canvas.width/2, Math.random()*gameScreen.canvas.height, 0);
        newMob.spawn();
        currentMob[1]--;
        this.enemiesSpawned ++;
        if (currentMob[1] == 0) {
            this.mList.splice(mobIndex, 1);
        }
        console.log(this.initMobList);
    }
    

}
