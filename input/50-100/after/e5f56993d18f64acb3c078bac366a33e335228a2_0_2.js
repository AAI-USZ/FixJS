function analyseChapter(sourceCode) {

	// Clear string
	chapterText = '';
	
	// Include author's notes
	match = sourceCode.match(/<div class='notes'>([\s\S]*?)<\/div>\s*<div id="story">/im)
	if (match) {
		chapterText += matchNotes[1] + '<hr />';
	}

	//Chaptertext
	match = sourceCode.match(/<div id="story">([\s\S]*?)<\/div>\s*<div id="prev">/im)
	if (match) {
		chapterText += match[1];
	}

	return true;
}