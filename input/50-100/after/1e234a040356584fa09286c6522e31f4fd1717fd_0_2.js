function getSource(e){
    var src = getSrc(e);
    if (src.search(/https?:\/\/(www\.)?youtube\.com\/(v|embed)\//) == 0){	
	return "youtube";
    }
    if (src.search("http://www.kino-govno.com/") == 0)
	return "kino-govno";
    if (src.search("http://video.ted.com/") == 0)
	return "ted.com";
    if (src.search("http://vimeo.com/moogaloop.swf") == 0)
	return "vimeo";
    return undefined;
}