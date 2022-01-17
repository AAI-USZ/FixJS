function(e) {
		if (e.target.nodeName=='DIV') {
			if ($jq(e.target).hasClass("replyContainer") && !$jq(e.target).parent().is(".inline, #qp")) {
				updatePost($jq(".reply", e.target));
				if (!delaySyncHandler) {
					delaySyncHandler = setTimeout(function() {
						setTimeout(sync, 3500, true);
						delaySyncHandler = null;
					}, 1500);
				}
			}
				
			if (e.target.id == "qr")
				QRListen();
		}
	}