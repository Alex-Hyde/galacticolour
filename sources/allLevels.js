function createLevelList() {
    level1 = new levelScroll1(1);;//Level([new Wave([[PurpleSinMob, 2], [YellowSinMob, 2], [RedSinMob, 2],[GreenSinMob, 2]], 1500)], 1);
    level2 = new Level([new Wave([[yellowTracker, 4], [redTracker, 4]], 1500), new Wave([[purpleTracker, 5], [yellowTracker, 3]], 1500)], 2);
    level3 = new Level([new Wave([[yellowTracker, 3], [redTracker, 5], [YellowSinMob, 5], [RedSinMob, 5]], 1500), new Wave([[PurpleSinMob, 5], [YellowSinMob, 2], [greenTracker, 6]], 1500)], 3);
    level4 = new levelScroll1(4);
    level5 = new Level([new Wave([[redRobotTank, 1], [leftgreenRobotTank, 1], [purpleRoboSinMob, 5]], 1500)], 5);
    return [level1, level2, level3, level4, level5];
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
