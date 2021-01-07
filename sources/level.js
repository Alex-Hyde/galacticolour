function Level(waveList, levelID) {
    this.levelNum = levelID;
    this.waveNumber = 0;
    this.initWaveList = waveList.map(wave => wave);
    this.waveList = waveList;
    this.currentWave = this.waveList[this.waveNumber];
    this.complete = false;
    this.gameOver = false;
    this.gameOverTime = 0;
    this.backgroundImg = document.getElementById("space");
    this.bgImgX = 0;
    this.bgImgY = 0;
    this.unlocked = false;
    this.audio = '';
    if (this.levelNum == 1) {
        this.unlocked = true;
    }
    //this.spawnInterval = setInterval(this.currentWave.spawnEnemies, this.currentWave.spawnTime);

    this.loadLevel = function() { //.slice(0,2);   // make empty in actual game
        this.gameOver = false;
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
        this.audio = new Audio('songs/battle_4.mp3');
        this.audio.volume = 0.3;
        this.audio.play();
    }
    
    this.update = function() {
        refreshDate = new Date()
        clock = refreshDate.getTime();
        this.bgImgX = player.x / 10;
        this.bgImgY = player.y / 10;
        ctx = gameScreen.context;
        ctx.drawImage(this.backgroundImg, this.bgImgX, this.bgImgY, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        ctx.font = "13px Courier";
        ctx.fillStyle = "white";
        ctx.fillText("Press Esc to Exit Level", 100, 20);
        if ((gameScreen.keys && gameScreen.keys[27]) || player.health <= 0) {
            if (!this.gameOver) {
                this.gameOverTime = clock;
                this.gameOver = true;
            }
        }
        if (this.gameOver) {
            if (clock - this.gameOverTime < 3000) {
                ctx.font = "20px Courier";
                ctx.fillText("Game Over!", gameScreen.canvas.width/2, gameScreen.canvas.height/2);
            } else {
                this.clearMobs();
                currentLevel = NaN;
                this.audio.pause();
                this.audio.currentTime = 0;
                loadLevelSelect(this.levelNum - 1);
            //    entityList.other[0].currentLevelIndex = this.levelNum - 1;
            }
        } else if (clock - this.startTime < 3000) {
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
        } else if (this.currentWave.mList.length != 0) {
            if ((clock-this.startTime) % this.currentWave.spawnTime < 15) {
                this.currentWave.spawnEnemies();
            }
        } else if (this.currentWave.mList.length == 0 && entityList.mobList.length == 0) {
            if (!this.currentWave.waveDone) {
                //d = new Date();
                //t = d.getTime();
                this.clearMobs();
                this.currentWave.doneTime = clock;
                this.currentWave.waveDone = true;
            }
            //d = new Date();
            //ti = d.getTime();
            this.waveClear(clock);
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
            ctx.fillText(`Wave ${this.waveNumber + 1} Complete.`, gameScreen.canvas.width/2, gameScreen.canvas.height/2);
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
        this.audio.pause();
        this.audio.currentTime = 0;
        this.complete = true;
        currentLevel = NaN;
        levelList[this.levelNum].unlocked = true;
        loadLevelSelect(this.levelNum - 1);
    }

    this.clearMobs = function() {
        entityList.mobList = [];
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

function Wave(mobList, spawnTime) {  // mobList is an association list with the type and number of spawns
    this.initMobList = mobList.map(mob => mob.map(i => i));
    this.mList = mobList;
    this.spawnTime = spawnTime;
    this.waveDone = false;
    this.doneTime = 0;
    
    this.resetWave =function() {
        this.mList = this.initMobList.map(mob=>mob.map(i => i));
        this.waveDone = false;
        this.doneTime = 0;
    }
    this.spawnEnemies = function() {
        mobIndex = Math.floor(Math.random() * this.mList.length);
        offsetX = Math.floor(Math.random()*100);
        currentMob = this.mList[mobIndex];
        //let mobSpawnY = 0;
        //let mobSpawnX = 0;
        //newMob = new currentMob[0]("yellow", gameScreen.canvas.width/2, Math.random()*gameScreen.canvas.height);
        if (currentMob[0] == Mothership || currentMob[0] == RoboMothership){
            mobSpawnY = 50;
            mobspawnX= gameScreen.canvas.width/2
        } 
        else if(currentMob[0]==leftgreenRobotTank ||currentMob[0]==leftredRobotTank ||currentMob[0]==leftyellowRobotTank ||currentMob[0]==leftpurpleRobotTank|| currentMob[0]==greenLeftTank || currentMob[0]==redLeftTank || currentMob[0]==yellowLeftTank || currentMob[0]==purpleLeftTank){
            mobSpawnY = Math.random()*(gameScreen.canvas.height-50) + 25
            mobspawnX = 200
        }
        else if(currentMob[0]==greenRobotTank || currentMob[0]==redRobotTank || currentMob[0]==yellowRobotTank || currentMob[0]==purpleRobotTank || currentMob[0]==greenTank || currentMob[0]==purpleTank || currentMob[0]==yellowTank || currentMob[0]==redTank ){
            mobSpawnY = Math.random()*(gameScreen.canvas.height-50) + 25
            mobspawnX = 980
        }
        else {
            mobSpawnY = Math.random()*(gameScreen.canvas.height-50) + 25
            mobspawnX = offsetX + gameScreen.canvas.width/2
        }
        newMob = new currentMob[0](mobspawnX-100, mobSpawnY, 0);
        newMob.spawn();
        currentMob[1]--;
        if (currentMob[1] == 0) {
            this.mList.splice(mobIndex, 1);
        }
    }
    

}
