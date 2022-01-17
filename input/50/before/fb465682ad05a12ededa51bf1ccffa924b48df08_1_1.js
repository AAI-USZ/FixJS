function(){
	var XKCDReaderComic = new nl.windgazer.YQLComic(
		(943<<16) + 5,
		"XKCD",
		"http://xkcd.com/",
		"//*[contains(@*,\"content\") or contains(@*,\"comic\")][1]//img[1]|//a[contains(@rel, \"prev\") or contains(., \"Prev\") or contains(@*, \"prev\") or contains(@rel, \"next\") or contains(., \"Next\") or contains(@*, \"next\")][1]"
	);

	Comics.addComic(XKCDReaderComic.getId(), XKCDReaderComic);
}