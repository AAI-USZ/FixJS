function() {
		var xml = new DOMParser().parseFromString(xhr.responseText.replace(/^\s+/,""), "text/xml");
		var items = xml.getElementsByTagName("item");
		
		var list = [];
		var playlist = [];
		
		var content, poster, title, obj;
		for(var i = 0; i < items.length; i++) {
			content = items[i].getElementsByTagNameNS("http://search.yahoo.com/mrss/", "content")[0];
			if(!content) continue;
			obj = {"content": content.getAttribute("url")};
			
			poster = items[i].getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail")[0];
			if(poster) obj.poster = poster.getAttribute("url");
			
			title = items[i].getElementsByTagName("title")[0];
			if(title) obj.title = title.textContent;
			
			list.push(obj);
		}
		
		var length = list.length - 1;
		
		var next = function() {
			if(list.length === 0) callback({"playlist": playlist});
			else addToPlaylist(list.shift());
		};
		
		var addToPlaylist = function(obj) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", obj.content, true);
			delete obj.content;
			xhr.addEventListener("load", function() {
				var renditions = xhr.responseXML.getElementsByTagName("rendition");
				
				var sources = [];
				for(var i = renditions.length -1 ; i >= 0; i--) {					
					var source = typeInfo(renditions[i].getAttribute("type"));
					if(source === null) continue;
					source.format = renditions[i].getAttribute("bitrate") + "k " + source.format;
					source.height = parseInt(renditions[i].getAttribute("height"));
					source.url = renditions[i].getElementsByTagName("src")[0].textContent;	
					source.url = "http://mtvnmobile.vo.llnwd.net/kip0/_pxn=0+_pxK=18639/44620/mtvnorigin" + source.url.substring(source.url.indexOf("/gsp."));
					sources.push(source);
				}
				
				if(sources.length === 0) {
					if(list.length === length) return;
				} else {
					obj.sources = sources;
					playlist.push(obj);
				}
				
				next();
			}, false);
			xhr.send(null);
		};
		
		next();
		
	}