function puzzlesLoaded(puzzles) {
		deleteChildren(scramblePre);
		puzzleSelect.setDisabled(false);
		var options = [];
		for(var i = 0; i < puzzles.length; i++) {
			var iconUrl = scrambler.getPuzzleIconUrl(puzzles[i][0]);
			options.push({ value: puzzles[i][0], text: puzzles[i][1], icon: iconUrl });
		}
		puzzleSelect.setOptions(options);
		loadedCallback(puzzles);
	}