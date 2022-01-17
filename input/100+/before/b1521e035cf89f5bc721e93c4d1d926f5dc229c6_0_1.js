function putGo(e)
	{
		var x = e.pageX - $("#myCanvas").offset().left;
		var y = e.pageY - $("#myCanvas").offset().top;
		x -= twoSpace;
		y -= twoSpace;

		if(x < 0 || y < 0 || x > base || y > base)
			return;
		var moveX = x / space + 1;
		var baseMoveX = Math.floor(moveX);
		var moveY = y / space + 1;
		var baseMoveY = Math.floor(moveY);

		// Check the position belong to where 
		if(moveX - baseMoveX >= 0.8) moveX = baseMoveX + 1;
		else if(moveX - baseMoveX <= 0.4) moveX = baseMoveX;
		else return;
		if(moveY - baseMoveY >= 0.8) moveY = baseMoveY + 1;
		else if(moveY - baseMoveY <= 0.4) moveY = baseMoveY;
		else return;

		if(exGoMap.count === 0)
		{
			var currentMove = goMap.getCurrentMove();

			// If the position I put is not empty, then ignore it
			if(goMap.getCurrentMapCellColor(moveX, moveY) === 1 || goMap.getCurrentMapCellColor(moveX, moveY) === 0)
			{
				return;
			}
			else if(currentMove.x != 0 && currentMove.y != 0)
			{
				exGoMap.insertMap(goMap.getCurrentMap());
				exGoMap.mapList[exGoMap.count][moveX][moveY].color = 1 - goMap.getCurrentMapCellColor(currentMove.x, currentMove.y);
			}
			else if(currentMove.x === 0 && currentMove.y === 0) // First click
			{
				exGoMap.insertMap(goMap.getCurrentMap());
				exGoMap.mapList[exGoMap.count][moveX][moveY].color = 1;
			}
		}
		else
		{
			var tmp = exGoMap.moveList[exGoMap.count - 1];

			// If the position I put is not empty, then ignore it
			if(exGoMap.mapList[exGoMap.count - 1][moveX][moveY].color === 1 || exGoMap.mapList[exGoMap.count - 1][moveX][moveY].color === 0)
			{
				return;
			}
			else if(tmp.x != 0 && tmp.y != 0) 
			{
				exGoMap.insertMap(exGoMap.mapList[exGoMap.count - 1]);
				exGoMap.mapList[exGoMap.count][moveX][moveY].color = 1 - exGoMap.mapList[exGoMap.count - 1][tmp.x][tmp.y].color;
			}
		}

		exGoMap.insertMove(new Move(moveX, moveY));
		exGoMap.count++;
		findDeadStone(exGoMap.mapList[exGoMap.count - 1], moveX, moveY);
		paint();
	}