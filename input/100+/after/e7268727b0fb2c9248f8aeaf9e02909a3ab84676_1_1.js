function(url, isEmbed, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.addEventListener("load", function() {
		var xml = xhr.responseXML;
		var media = xml.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "content");
		var sources = [];
		var url, info, height, width, audioOnly = true;
		
		for(var i = 0; i < media.length; i++) {
			url = media[i].getAttribute("url");
			info = urlInfo(url);
			if(!info) continue;
			if(!info.isAudio) audioOnly = false;
			height = media[i].getAttribute("height");
			width = media[i].getAttribute("width");
			info.url = url;
			info.format = media[i].getAttributeNS("http://blip.tv/dtd/blip/1.0", "role") + (info.isAudio ? "" : " (" + width + "x" + height + ")") + " " + info.format;
			info.height = parseInt(height);
			sources.push(info);
		}
		
		var siteInfo;
		if(isEmbed) {
			var itemId = xml.getElementsByTagNameNS("http://blip.tv/dtd/blip/1.0", "item_id")[0];
			if(itemId) siteInfo = {"name": "Blip.tv", "url": "http://www.blip.tv/file/" + itemId.textContent};
		}
		
		callback({
			"playlist": [{
				"title": xml.getElementsByTagName("item")[0].getElementsByTagName("title")[0].textContent,
				"poster": xml.getElementsByTagNameNS("http://search.yahoo.com/mrss/", "thumbnail")[0].getAttribute("url"),
				"sources": sources,
				"siteInfo": siteInfo
			}],
			"audioOnly": audioOnly
		});
	}, false);
	xhr.send(null);
}