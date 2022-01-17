function analyseChapter(sourceCode) {

	// Clear string
	chapterText = '';
	
	// Include author's notes
	chapterText += sourceCode.match(/<div class='notes'>([\s\S]*?)<\/div>\s+<div id="story">/im)[1];
	
	if (chapterText != '')
		chapterText += '<hr />';

	//Chaptertext
	chapterText += sourceCode.match(/<div id="story">([\s\S]*?)<\/div>\s+<div id="prev">/im)[1];

	return true;
}