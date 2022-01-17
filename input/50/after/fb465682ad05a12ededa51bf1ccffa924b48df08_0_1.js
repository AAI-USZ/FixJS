function(){
	var PVPOnlineReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 4,
		"PVP Online"
		, "http://pvponline.com/comic/"
		, "//div[@class=\"post\"]//img|//a[contains(@*,\"prevBtn\") or contains(@*,\"nextBtn\")]"
	);

	Comics.addComic(PVPOnlineReaderComic.getId(), PVPOnlineReaderComic);
}