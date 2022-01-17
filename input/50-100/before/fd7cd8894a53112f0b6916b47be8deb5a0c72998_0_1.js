function writeOriginalSentences() {
	for ( var s = 0; s < sentences.length; s++) {
		$("#sent" + s).text(sentences[s]);
	}
}