function(){
	var PVPOnlineReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 4,
		"PVP Online"
		, "http://www.pvponline.com/"
		, "//div[@id=\"comic\"]//img|//a[@rel=\"prev\"]|//a[@rel=\"next\"]"
	);

	Comics.addComic(PVPOnlineReaderComic.getId(), PVPOnlineReaderComic);
}