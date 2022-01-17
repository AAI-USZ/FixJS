function placeTower(clickedX, clickedY, towerWidth, towerHeight) {
	
	if (clickedX == 0) {
		clickedX = towerWidth;
	} else if (clickedX > 0) {
		clickedX = Math.ceil(clickedX/towerWidth) * towerWidth;
	} else if (clickedX == ctx.height) {
		clickedX = ctx.height;
	}

	if (clickedY == 0) {
		clickedY = towerHeight;
	} else if (clickedY > 0) {
		clickedY = Math.ceil(clickedY/towerHeight) * towerHeight;
	} else if (clickedY == ctx.height) {
		clickedY = ctx.height;
	}

	towers.push({
		startingX: clickedX,
		startingY: clickedY
	});

    var xPosition = (clickedX / towerWidth) - 1;
    var yPosition = (clickedY / towerHeight) - 1;

    console.log(xPosition + 'xpos');
    console.log(yPosition + 'ypos');

    blockedX[yPosition] = 1;
    blockedY[xPosition] = 1;

}