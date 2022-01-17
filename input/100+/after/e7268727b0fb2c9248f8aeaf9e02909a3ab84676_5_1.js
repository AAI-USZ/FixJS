function(playlistURL, startIndex, reverse) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", playlistURL + "?start-index=" + startIndex + "&max-results=50", true);
		xhr.addEventListener("load", function() {
			if(xhr.status !== 200) {
				_this.processFlashVars(flashvars, callback);
				return;
			}
			var entries = xhr.responseXML.getElementsByTagName("entry");
			for(var i = 0; i < entries.length; i++) {
				try{ // being lazy
					videoIDList[reverse ? "unshift" : "push"](/\?v=([^&?']+)/.exec(entries[i].getElementsByTagNameNS("http://search.yahoo.com/mrss/", "player")[0].getAttribute("url"))[1]);
				} catch(e) {}
			}
			if(xhr.responseXML.querySelector("link[rel='next']") === null) processList();
			else loadAPIList(playlistURL, startIndex + 50, reverse);
		}, false);
		xhr.send(null);
	}