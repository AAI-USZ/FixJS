function(){
	    var url = this.element.parents(".post").find('.entry-title').find("a").attr("href");
	    if (url)
		return url;
	    else
		return document.URL;
	}