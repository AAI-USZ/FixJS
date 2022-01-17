function puzzlesLoaded(puzzles) {
		deleteChildren(scramblePre);
		puzzleSelect.setDisabled(false);
		var options = [];
		for(var i = 0; i < puzzles.length; i++) {
			var iconUrl = scrambler.getPuzzleIconUrl(puzzles[i].shortName);
			options.push({ value: puzzles[i].shortName, text: puzzles[i].longName, icon: iconUrl });
		}
		puzzleSelect.setOptions(options);
		loadedCallback(puzzles);
	}