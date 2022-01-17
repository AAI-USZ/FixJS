function (url) {
		if (url) {
			if (zk.mobile) {
				var link = document.createElement('a'),
					evt = document.createEvent('Event');
				link.setAttribute('href', url);
				link.setAttribute('target','_blank');
				link.setAttribute('id', 'zk_download');
				evt.initEvent('click', true, false);
				link.dispatchEvent(evt);
				jq('#zk_download').detach();
			} else {
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
	}