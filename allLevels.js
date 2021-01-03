function createLevelList() {
    level1 = new Level([new Wave([[Mothership, 1], [purpleTank, 1], [redMedic, 1]], 1500), new Wave([[YellowSinMob, 3], [PurpleSinMob, 3], [Mob3, 6]], 12, 1500)], 1);
    level2 = new Level([new Wave([[PurpleSinMob, 7], [Mob3, 10]], 17, 1500), new Wave([[YellowSinMob, 3], [PurpleSinMob, 3]], 6, 1500)], 2);
    level3 = new Level([new Wave([[yellowLeftTank, 3], [redTracker, 9], [PurpleSinMob, 0], [Mob3, 0]], 12, 1500), new Wave([[YellowSinMob, 5], [PurpleSinMob, 2], [Mob3, 6]], 13, 1500)], 3);
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
