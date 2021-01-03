function createLevelList() {
    level1 = new Level([new Wave([[Mothership, 1], [yellowMedic, 1], [RedSinMob, 10]], 1500), new Wave([[PurpleSinMob, 3], [YellowSinMob, 3], [RedSinMob, 6]], 1500)], 1);
    level2 = new Level([new Wave([[YellowSinMob, 7], [RedSinMob, 10]], 1500), new Wave([[PurpleSinMob, 3], [YellowSinMob, 3]], 1500)], 2);
    level3 = new Level([new Wave([[yellowLeftTank, 3], [redTracker, 9], [YellowSinMob, 0], [RedSinMob, 0]], 1500), new Wave([[PurpleSinMob, 5], [YellowSinMob, 2], [RedSinMob, 6]], 1500)], 3);
    level4 = new levelScroll1(4);
    level5 = new Level([new Wave([[yellowTracker, 3], [greenTracker, 3], [purpleTracker, 3]], 1500)], 5);
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
