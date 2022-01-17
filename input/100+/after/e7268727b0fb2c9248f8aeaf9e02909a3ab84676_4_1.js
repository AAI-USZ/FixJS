function(videoID, callback) {
	var _this = this;
	var xhr = new XMLHttpRequest();
	var url = "http://www.metacafe.com/watch/" + videoID;
	xhr.open("GET", url, true);
	xhr.addEventListener("load", function() {
		var match = /name=\"flashvars\"\svalue=\"([^"]*)\"/.exec(xhr.responseText);
		if(match) {
			var callbackForEmbed = function(videoData) {
				videoData.playlist[0].siteInfo = {"name": "Metacafe", "url": url};
				callback(videoData);
			};
			_this.processFlashVars(match[1], callbackForEmbed);
		}
	}, false);
	xhr.send(null);
}