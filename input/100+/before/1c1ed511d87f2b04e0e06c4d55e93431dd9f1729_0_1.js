function (url) {
		if (url) {
			var ifr = jq('#zk_download')[0];
			if (ifr) {
				ifr.src = url; //It is OK to reuse the same iframe
			} else {
				var html = '<iframe src="'+url
				+'" id="zk_download" name="zk_download" style="visibility:hidden;width:0;height:0;border:0" frameborder="0"></iframe>';
				jq(document.body).append(html);
			}
		}
	}