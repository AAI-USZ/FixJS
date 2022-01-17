function(language) {
    var letterBag = new LetterBag;

    letterBag.tiles = [];
    letterBag.legalLetters = '';

    var letterDistribution = letterDistributions[language];
    if (!letterDistribution) {
        throw 'unsupported language: ' + language;
    }
    for (var i = 0; i < letterDistribution.length; ++i) {
	var letterDefinition = letterDistribution[i];
	
	var tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
        if (letterDefinition.letter) {
            letterBag.legalLetters += letterDefinition.letter;
        }
	
	for (var n = 0; n < letterDefinition.count; ++n) {
	    var tile = new Tile(letterDefinition.letter || " ", letterDefinition.score);
	    letterBag.tiles.push(tile);
	}
    }
    
    return letterBag;
}