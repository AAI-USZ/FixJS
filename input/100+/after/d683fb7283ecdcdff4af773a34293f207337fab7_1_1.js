function(){
	var GirlGeniusReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 2,
		"Girl Genius"
		, "http://www.girlgeniusonline.com/comic.php"
		, "//img[@alt=\"Comic\"]|//table[@id=\"MainTable\"]/tr[2]/td[1]//a[2]|//table[@id=\"MainTable\"]/tr[2]/td[1]//a[3]"
		, {
			/**
			 * Sorting entry url versus link,  if the first one is the link, it's a previous link :)
			 */
			getLinkIsPrev: function( link, jsonData, url, comic ) {
				//No request params means latest comic and link is then always to previous...
				if (url.indexOf("?") < 1) return true;
				
				//Else sort current url versus the link...
				var urls = [url, link.href];
				urls.sort();
				
				//if url does not equal the first link after sort, the link is to previous comic...
				var isPrev = url != urls[0];
				return isPrev;
			}
		}
	);
	
	Comics.addComic(GirlGeniusReaderComic.getId(), GirlGeniusReaderComic);
}