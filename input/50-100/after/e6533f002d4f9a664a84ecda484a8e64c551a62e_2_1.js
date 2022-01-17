function(){
	var PVPOnlineReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 4,
		"PVP Online"
		, "http://pvponline.com/comic/"
		, "//div[@class=\"post\"]//img|//a[contains(@*,\"prevBtn\")]|//a[contains(@*,\"nextBtn\")]"
		, {
			/**
			 * It's all in the classname...
			 */
			getLinkIsPrev: function( link, url, comic ) {
				return link["class"] && link["class"].indexOf("prev") >= 0;
			}
		}
	);

	Comics.addComic(PVPOnlineReaderComic.getId(), PVPOnlineReaderComic);
}