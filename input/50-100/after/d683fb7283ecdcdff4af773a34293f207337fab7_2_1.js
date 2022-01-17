function(){

	var MenageA3ReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 1,
		"Menage a 3"
		, "http://www.menagea3.net/"
		, "//div[@id=\"cc\"]//img|//a[@id=\"cndprev\"]|//a[@id=\"cniprev\"]|//a[@id=\"cndnext\"]"
		, {
			/**
			 * Sorting entry url versus link,  if the first one is the link, it's a previous link :)
			 */
			getLinkIsPrev: function( link, jsonData, url, comic ) {
				return jsonData.query.results.a.id && jsonData.query.results.a.id.indexOf("prev") >= 0;
			}
		}
	);

	Comics.addComic(MenageA3ReaderComic.getId(), MenageA3ReaderComic);
}