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

    this.loadLevel = function() { //.slice(0,2);   // make empty in actual game
        this.gameOver = false;
        entityList.clear();
        player.spawn(gameScreen.canvas.width/2, gameScreen.canvas.height/2, 0);
        this.waveList = this.initWaveList.map(wave=>wave);
        this.waveNumber = 0;
        this.waveList.forEach(wave => {
            wave.resetWave();
        })
        this.currentWave = this.waveList[this.waveNumber];
        startDate = new Date();
        this.startTime = startDate.getTime();
        currentLevel = levelList.findIndex(l => l.levelNum == this.levelNum) + 1;
        this.audio = new Audio('songs/battle_4.mp3');
        this.audio.volume = 0.3;
        this.audio.play()
        this.audio.loop = true;
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
        if(gameScreen.keys && gameScreen.keys[27]){
            loadLevelSelect(this.levelNum - 1);
            this.clearMobs();
            currentLevel = NaN;
            this.audio.pause();
            this.audio.currentTime = 0;
            loadLevelSelect(this.levelNum - 1);
        }
        if (player.health <= 0) {
            this.clearMobs();
            currentLevel = NaN;
            this.audio.pause();
            this.audio.currentTime = 0;
            loadDeathScreen(this.levelNum - 1);
        }
        if (this.gameOver) {
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
        } 
        else if (this.currentWave.mList.length != 0 && player.bullettime!=true) {
            if ((clock-this.startTime) % this.currentWave.spawnTime < 15) {
                this.currentWave.spawnEnemies();
            }
        } else if (this.currentWave.mList.length == 0 && entityList.mobList.length == 0) {
            if (!this.currentWave.waveDone) {
                this.clearMobs();
                this.currentWave.doneTime = clock;
                this.currentWave.waveDone = true;
            }
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
        if (this.levelNum == 14) {
            loadWinScreen();
        } else {
            levelList[this.levelNum].unlocked = true;
            loadLevelSelect(this.levelNum - 1);
        }
    }

    this.clearMobs = function() {
        entityList.mobList = [];
    }

    this.nextWave = function() {
        this.waveNumber ++;
        this.currentWave = this.waveList[this.waveNumber];
    }

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
        else if(currentMob[0]==PurpleSinMob || currentMob[0]==RedSinMob || currentMob[0]==GreenSinMob || currentMob[0]== YellowSinMob || currentMob[0]== yellowRoboSinMob || currentMob[0]==greenRoboSinMob || currentMob[0]==redRoboSinMob || currentMob[0]==purpleRoboSinMob){
            mobSpawnY = Math.random()*(gameScreen.canvas.height-150)
            mobspawnX = offsetX + gameScreen.canvas.width/2
            if(Math.abs(player.x-mobspawnX) < 100){
                while(Math.abs(player.y-mobSpawnY) < 100 && mobSpawnY < 100){
                    mobSpawnY = Math.random()*(gameScreen.canvas.height-100) 
                }
            }
        }
        else {
            mobspawnX = offsetX + gameScreen.canvas.width/2
            mobSpawnY = Math.random()*(gameScreen.canvas.height-50) + 25
            if(Math.abs(player.x-mobspawnX) < 100){
            while(Math.abs(player.y-mobSpawnY) < 100){
                mobSpawnY = Math.random()*(gameScreen.canvas.height-50) + 25   
            }
        }
    }
        newMob = new currentMob[0](mobspawnX-100, mobSpawnY, 0);
        newMob.spawn();
        newMob.update();
        portalAnimation(newMob.x-100, newMob.y-100, 200, 200);
        currentMob[1]--;
        if (currentMob[1] == 0) {
            this.mList.splice(mobIndex, 1);
        }
    }
    

}
