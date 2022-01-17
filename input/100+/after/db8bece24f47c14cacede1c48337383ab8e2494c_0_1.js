function getChapterRange(scriptureRange)
	{
		var pattChSeg=/[\ \-]([1-9][0-9]?[0-9]?)[\.\:\ ]?/g;
		var pattVerse=/[\.\:]([1-9][0-9]?[0-9]?)?/g;
		var chMatches = scriptureRange.match(pattChSeg);
		var verseMatches = scriptureRange.match(pattVerse);
		var chapters = [];
		var pattCh=/([1-9][0-9]?[0-9]?)/;
		
		// crop each chapter segment into just the chapter
		if (!chMatches)
			return null;
		var chBegin = chMatches[0].match(pattCh)[0];
		chapters.push(chBegin);		
		if (chMatches.length == 2 && (!verseMatches || (verseMatches.length == 0 || verseMatches.length == 2)))
		{
			var chEnd = chMatches[1].match(pattCh)[0];
			chapters.push(chEnd);
		}		
		return chapters;
	}