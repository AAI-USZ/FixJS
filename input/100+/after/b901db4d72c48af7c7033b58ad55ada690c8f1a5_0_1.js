function buildPathingArrays(mapHeight, mapWidth, towerHeight, towerWidth) {
    var horizontalRows = mapHeight / towerHeight;
    var verticalRows = mapWidth / towerWidth;
    var xIterations = Math.floor(horizontalRows / 8);
    var yIterations = Math.floor(verticalRows / 8);
    var xLeftover = horizontalRows % 8;
    var yLeftover = verticalRows % 8;
    var i = 0;
    var x = 0;
    var y = 0;
    var iY = 1;

    if (xLeftover > 0) {
        do {
            blockedX[x] = towerWidth * x;
            x++;
        } while (--xLeftover > 0);
    }

    do {
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
        blockedX[x++] = towerWidth * x;
    } while (--xIterations > 0);

    if (yLeftover > 0) {
        do {
            blockedY[y] = towerHeight * iY;
            y++;
            iY++;
        } while (--yLeftover > 0);
    }

    do {
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
        blockedY[y++] = towerHeight * y;
    } while (--yIterations > 0);    
    

}