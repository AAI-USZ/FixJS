function writeOriginalSentences() {
	for ( var s = 0; s < sentences.length; s++) {
		$("#sent" + s).text(sentences[s]);
	}
	/*for(var i = 0; i < words.length; i++){
		var s = "";
		for(var j = 0; i < words[i].length; j++){
			s += words[i][j]+ " ";
		}
		$("#sent" + 1).text(s);
	}*/
}