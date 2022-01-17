function (i, link) {
			var link = new CSLEDIT.CslNode(link);

			if (link.getAttr("rel") === "self") {
				selfLinkNode = link;
				selfLink = link.getAttr("href");
			}
		}