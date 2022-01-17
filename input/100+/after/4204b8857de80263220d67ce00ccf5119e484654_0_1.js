function(data, callback) {
	var isSecure = data.src.charAt(4) === "s";
	var url;
	if(/[&?]playerID=/.test(data.src)) {
		url = data.src.replace("federated_f9", "htmlFederated");
	} else {
		var flashvars = parseFlashVariables(data.params.flashvars);
		url = (isSecure ? "https://secure" : "http://c") + ".brightcove.com/services/viewer/htmlFederated?playerID=" + flashvars.playerID + "&playerKey=" + flashvars.playerKey + "&%40videoPlayer=" + flashvars.videoId;
	}
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.addEventListener("load", function() {
		var i = xhr.responseText.indexOf("experienceJSON");
		if(i === -1) return;
		
		var s = xhr.responseText.substring(i + 17);
		s = s.substring(0, s.indexOf("\n") - 2);
		
		try {
			var media = JSON.parse(s).data.programmedContent.videoPlayer.mediaDTO;
		} catch(e) {
			return;
		}
		
		var sources = [];
		var processRendition = function(source) {
			// videoCodec can be H264, SORENSON, or ON2
			if(source.videoCodec !== "H264" || !source.defaultURL) return;
			sources.unshift({"url": source.defaultURL, "format": Math.round(parseInt(source.encodingRate)/100000) + "00k MP4", "height": parseInt(source.frameHeight), "isAudio": source.audioOnly, "isNative": true});
		};
		
		media.renditions.forEach(processRendition);
		if(sources.length === 0) {
			media.IOSRenditions.forEach(processRendition);
			if(sources.length === 0) {
				var source = urlInfo(media.FLVFullLengthURL);
				if(source && !media.FLVFullLengthStreamed) {
					source.url = media.FLVFullLengthURL;
					sources.push(source);
				} else return;
			}
		}
		
		callback({"playlist": [{
			"sources": sources,
			"poster": media.videoStillURL,
			"title": media.displayName
		}]});
	}, false);
	xhr.send(null);
}