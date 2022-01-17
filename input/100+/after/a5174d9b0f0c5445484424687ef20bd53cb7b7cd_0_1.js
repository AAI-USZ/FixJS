function getCitationMarkup(content, bookName1, chRange)
	{
		if (content == null)
			return null;
		//alert("applyCitation")
		var pattCVerseRef=/(?:(?:[1-9][0-9]?[0-9]?[.:])?[1-9][0-9]?[-–—]?)+/g;		
		var matches2 = content.match(pattCVerseRef);
		//alert(matches2)
		if (matches2 == null)
			return null;
		var remainingContent = content;
		var finalContent = "";
		for (j = 0; j < matches2.length; j++)
		{
			var chVerseRange = matches2[j];
			var title = chVerseRange;
			var matchLocation = remainingContent.indexOf(chVerseRange);
			var segment = remainingContent.substring(0, matchLocation + chVerseRange.length);
			remainingContent = remainingContent.substring(matchLocation + chVerseRange.length);
			//alert(chVerseRange);
			if (chRange && chRange[0].length > 0 && chVerseRange.indexOf(":") == -1 && chVerseRange.indexOf(".") == -1)
			{
				title = chRange[0] + ":" + chVerseRange;
			}
			var markup = '<cite class="bibleref" title="' + bookName1 + " " + title + '">' + chVerseRange + "</cite>";
			finalContent += segment.replace(chVerseRange, markup);
		}
		if (remainingContent.length > 0 && remainingContent != content)
		{
			finalContent += remainingContent;
		}
		return finalContent;
	}