function(){
	var PVPOnlineReaderComic = new YQLOnlineReaderComic(
		"PVP Online"
		, "http://www.pvponline.com/"
		, "//div[@id=\"comic\"]//img|//a[@rel=\"prev\"]|//a[@rel=\"next\"]"
	);
	ComicReader.addComic(PVPOnlineReaderComic);
}