function(){
	var XKCDReaderComic = new YQLOnlineReaderComic(
		"XKCD",
		"http://xkcd.com/",
		"//*[contains(@*,\"content\") or contains(@*,\"comic\")][1]//img[1]|//a[contains(@rel, \"prev\") or contains(., \"Prev\") or contains(@*, \"prev\") or contains(@rel, \"next\") or contains(., \"Next\") or contains(@*, \"next\")][1]"
	);

	ComicReader.addComic(XKCDReaderComic);
}