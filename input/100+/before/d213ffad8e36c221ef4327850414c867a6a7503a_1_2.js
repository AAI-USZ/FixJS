function tick() {
		//pill moving/turning logic
		//console.log(testGrid.getGridValue(testPill.x, testPill.y));
		if (continueLoop) {
			if (testPill.canMoveDown(testGrid)) {
				if (keyPress.shouldMove) {
					if (keyPress.left && testPill.canMoveLeft(testGrid)) {
						testPill.moveLeft();
						keyPress.shouldMove = false;
					}
					if (keyPress.right && testPill.canMoveRight(testGrid)) {
						testPill.moveRight();
						keyPress.shouldMove = false;
					}
					if (keyPress.down) {
						testPill.moveDown();
						keyPress.shouldMove = false;
					}
				}
				if (keyPress.shouldTurn) {
					if (keyPress.s && testPill.canTurnCW(testGrid)) {
						testPill.turnCW(testGrid);
						keyPress.shouldTurn = false;
					}
					if (keyPress.a && testPill.canTurnCCW(testGrid)) {
						testPill.turnCCW(testGrid);
						keyPress.shouldTurn = false;
					}
				}
			}

			else {
				testPill.writeToGrid(testGrid, stage);
				testGrid.print();
				testPill = new Pill(blockSS,290,150,"red","blue");
				stage.addChild(testPill);
				var blocksToDestroy = testGrid.checkBlocks();
				if ( blocksToDestroy.length > 0 ) {
					console.log(blocksToDestroy);
					testGrid.destroyBlocks( blocksToDestroy );
					testGrid.print();
					stage.update();

					continueLoop = false;
					window.setTimeout(mainDropBlocks, 500);
				}
			}
			stage.update();
			//console.log(testPill.x + ', ' + testPill.y);
		}
	}