function(){

	var MenageA3ReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 1,
		"Menage a 3"
		, "http://www.menagea3.net/"
		, "//div[@id=\"cc\"]//img|//a[@id=\"cndprev\"]|//a[@id=\"cniprev\"]|//a[@id=\"cndnext\"]"
		, {
			/**
			 * The id of the links contain wether they are next or previous links...
			 */
			getLinkIsPrev: function( link, jsonData, url, comic ) {
				return link.id && link.id.indexOf("prev") >= 0;
			}
		}
	);

	Comics.addComic(MenageA3ReaderComic.getId(), MenageA3ReaderComic);
}