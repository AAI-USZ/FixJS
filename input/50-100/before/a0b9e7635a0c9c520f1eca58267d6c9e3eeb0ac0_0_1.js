function analyseContent(sourceCode) {
	// First check if sourceCode contains the story index or a chapter:
	// Checking for TOC link because YFF does not have convenient STARTXXXFICSAVERS comments
	//if( sourceCode.indexOf("STARTAUTHORFICSAVERS") != -1 )
	if (sourceCode.match(/<a href="viewstory\.php\?sid=\d+&amp;index=1">Table of Contents<\/a>/))
	{
		// We're in a chapter, let's look up the story id and fetch the index page
		var sid = sourceCode.match(/<div id="pagetitle"><a href="viewstory.php\?sid=(\d+)">/m)[1];
		linkAdditionInfo = "http://www.yourfanfiction.com/viewstory.php?sid=" + sid + "&index=1&ageconsent=ok&warning=5";
		return true;
	}
	
	/*contentFilterSid = sourceCode.match(/class='errortext'>Age Consent Required<br \/><a href='viewstory\.php\?sid=(\d+)&amp;ageconsent=ok&amp;warning=\d+'>Ages 18\+ - Contains explicit content for mature adults only\.<\/a>/)[1];
	if (contentFilterSid)
	{
		// Content filter. Need to bypass it.
		var sid = sourceCode.match(/<div id="pagetitle"><a href="viewstory.php\?sid=(\d+)">/m)[1];
		linkAdditionInfo = "http://www.yourfanfiction.com/viewstory.php?sid=" + contentFilterSid + "&index=1&ageconsent=ok&warning=5";
		return true;
	}*/
	
	return analyseIndex(sourceCode);
}