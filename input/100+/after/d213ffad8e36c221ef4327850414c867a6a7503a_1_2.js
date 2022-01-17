function mainDropBlocks() {

		var checkAgain = testGrid.dropBlocks();
		testGrid.print();
		stage.update();
		var blocksToDestroy = testGrid.checkBlocks();
		if ( blocksToDestroy.length > 0 ) {
			testGrid.destroyBlocks( blocksToDestroy );
			testGrid.print();
			stage.update();

			//check if there are still viruses
		if ( testGrid.countViruses() <= 0 ) {
			gameOver();
			return;
		}

		}
		if (checkAgain) {
			window.setTimeout(mainDropBlocks, gameSpeed * 0.8);
		}
		else {
			continueLoop = true;
			movePill();
		}
	}