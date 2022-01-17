function analyseIndex(sourceCode)
{  
	var result;
	
	//Use RegEx to look for storyname, authorname....
  result = sourceCode.match(/<div id="pagetitle"><a href="viewstory.php\?sid=(\d+)">([^<]+)<\/a> by <a href="viewuser.php\?uid=\d+">([^<]+)</);
  
  var storyid = result[1];
  
	//Storyname
	//storyName = sourceCode.match(/var title_t = '(.*)';/)[1];
	storyName = result[2];
   
	//Authorname
	authorName = result[3];

	var catspan = sourceCode.match( /<span class="label">Categories:<\/span> ([\s\S]+?)<\/span/m )[1];

	var cats = [];
	var pat = /<a.+?>([^<]+)</mg;
	while( result = pat.exec(catspan) )
	{
		cats.push(result[1]);
	}
	//Category
	category = cats.join(',');

	//Updated '02-20-12';
	result = sourceCode.match(/<span class="label">Updated:<\/span> (\d+ \w+ \d+)/);
	var udate = new Date(result[1]);
	lastUpdated = '' + zeropad(udate.getMonth() + 1, 2) + '-' + zeropad(udate.getDate(), 2) + '-' + udate.getFullYear();
		
	//Storystatus
	result = sourceCode.search(/<span class="label">Completed:<\/span> Yes/);
	if( result != -1 )
	{
		storyStatus = "Completed";
	} else {
		storyStatus = "In Progress";
	}
   
	//Storywords
	totalWordCount = parseInt(sourceCode.match( /<span class="label">Word count:<\/span> (\d+)/ )[1], 10);
	
	//Chaptercount will be set when we extract chapter links and names
	countOfChapters = parseInt(sourceCode.match( /<span class="label">Chapters: <\/span> (\d+)/ )[1], 10);

	//Summary
	summary = sourceCode.match(/<span class="label">Summary: <\/span><p>([\s\S]+?)<\/p>/)[1];
   
	//Storylink (Always to the first chapter)
	storyLink = "http://www.yourfanfiction.com/viewstory.php?sid=" + storyid + "&chapter=1";//&ageconsent=ok&warning=5";
  
	pat = /<b>\d+\. <a href="(viewstory\.php\?sid=\d+&amp;chapter=\d+)">([^<]+)</mg;
	while( result = pat.exec( sourceCode ) )
	{
		chapterNames.push(result[2]);
		chapterLinks.push("http://www.yourfanfiction.com/" + result[1].replace('&amp;', '&')/* + "&ageconsent=ok&warning=5"*/);
	}

   return true;
}