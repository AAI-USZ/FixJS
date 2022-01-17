function(url) {
            url = url.replace(/^(https?:\/\/)?([^\/]+\.)?youtube\.com/, "http://www.youtube.com");
            //YouTube URL shortener
            url = url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?youtu\.be\/([a-zA-Z0-9_-]+)/, "http://www.youtube.com/watch?v=$1");
            //YouTube standard watch URL
            url = url.replace(/^http:\/\/www\.youtube\.com\/.*[?&](v=[a-zA-Z0-9_-]+).*$/, "http://www.youtube.com/watch?$1");
            //YouTube embeds
            url = url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?youtube\.com\/(?:embed|v)\/([a-zA-Z0_9_-]+)([^?]+)/, "http://www.youtube.com/watch?v=$1");
            url = url.replace(/^(?:https?:\/\/)?(?:[^\/]+\.)?vimeo\.com/, "http://vimeo.com");
            url = url.replace(/\/user\/([^\/\?#]+).*$/, "/user/$1");
	    return url;
        }