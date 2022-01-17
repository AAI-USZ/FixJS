function(e) {
		if (e.target.nodeName=='DIV') {
			if ($jq(e.target).hasClass("replyContainer") && !$jq(e.target).hasClass("inline")) {
				updatePost($jq(".reply", e.target));
				if (!delaySyncHandler) {
					delaySyncHandler = setTimeout(function() {
						setTimeout(sync, 4500, true);
						delaySyncHandler = null;
					}, 500);
				}
			}
				
			if (e.target.id == "qr")
				QRListen();
		}
	}