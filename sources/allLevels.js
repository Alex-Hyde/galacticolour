function createLevelList() {
    level1 = new Level([new Wave([[PurpleSinMob, 2], [YellowSinMob, 2], [RedSinMob, 2],[GreenSinMob, 2]], 1500)], 1);
    level2 = new Level([new Wave([[yellowTracker, 4], [redTracker, 4]], 1500), new Wave([[purpleTracker, 5], [yellowTracker, 3]], 1500)], 2);
    level3 = new Level([new Wave([[yellowTracker, 3], [redTracker, 5], [YellowSinMob, 5], [RedSinMob, 5]], 1500), new Wave([[PurpleSinMob, 5], [YellowSinMob, 2], [greenTracker, 6]], 1500)], 3);
    level4 = new levelScroll1(4);
    level5 = new Level([new Wave([[redRobotTank, 1]], 1500),new Wave([[leftgreenRobotTank, 1], [yellowRoboTracker, 4],[redRoboTracker,3]], 1500),new Wave([[yellowRobotTank, 1], [purpleRoboTracker, 5],[redRoboSinMob,5]], 1500)], 5);
    level6 = new Level([new Wave([[Mothership,1]],1500),new Wave([[Mothership,1],[redLeftTank,1]],1500),new Wave([[redTracker,3],[greenTracker,3],[Mothership,1],[YellowSinMob,4]],1500), new Wave([[greenTank,1],[Mothership,1],[RedSinMob,5]],1500)],6)
    level7 = new Level([new Wave([[redLeftTank,1],[GreenSinMob,5],[RedSinMob,3],[purpleTracker,4]],1500),new Wave([[Mothership,1],[yellowLeftTank,1],[YellowSinMob,5]],1500), new Wave([[redLeftTank,1],[greenTank,1],[Mothership,1],[YellowSinMob,4]],1500)],7)
    level8 = new Level([new Wave([[RoboMothership,1],[redRobotMedic,1]],1500), new Wave([[greenRoboSinMob,4],[purpleRoboSinMob,3],[yellowRoboSinMob,2],[yellowRobotTank,1],[yellowRobotMedic,1]],1500),new Wave([[redRobotTank,1],[leftyellowRobotTank,1],[RoboMothership,1],[greenRobotMedic,1],[redRoboSinMob,4],[greenRoboSinMob,4]],1500)],8)
    level9 = new levelScroll1(9);
    Level10= new Level([new Wave([[greenLeftTank,1],[purpleTank,1],[PurpleSinMob,5],[RedSinMob,5],[YellowSinMob,5],[Mothership,1]],1500),new Wave([[redMedic,1],[yellowTank,1],[yellowTracker,5],[greenTracker,3],[YellowSinMob,10]],1500),new Wave([[RedSinMob,10],[redTracker,5],[redTank,1],[redLeftTank,1]],1500)],10)
    return [Level10, level2, level3, level4, level5, level6, level7, level8, level9];
}
function levelSelect() {
    d = new Date();
    t = d.getTime();
    if (gameScreen.keys && !currentLevel) {
        if (gameScreen.keys[49]) {
            levelList[0].loadLevel();
        }
        if (gameScreen.keys[50]) {
            levelList[1].loadLevel();
        }
        if (gameScreen.keys[51]) {
            levelList[2].loadLevel();
        }
    }
}
