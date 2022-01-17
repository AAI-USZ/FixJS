function () {
		// checks that the style conforms to repository conventions and
		// prompts the user to change it if it doesn't
		
		var generatedStyleId,
			links,
			selfLinkNode,
			selfLink,
			styleName = getStyleName(),
			cancel = false;

		// check that the styleId and rel self link matches the schema conventions
		generatedStyleId = "http://www.zotero.org/styles/" + getNormalisedStyleName();
		links = CSLEDIT.data.getNodesFromPath("style/info/link");
		$.each(links, function (i, link) {
			var link = new CSLEDIT.CslNode(link);

			if (link.getAttr("rel") === "self") {
				selfLinkNode = link;
				selfLink = link.getAttr("href");
			}
		});

		console.log("generatedStyleId = " + generatedStyleId);
		$.each(CSLEDIT.cslStyles.styleTitleFromId, function (id, name) {
			if (id === generatedStyleId || name === styleName) {
				if (!confirm('The style title matches one that already exists.\n\n' +
						'You should change it to avoid problems using this style ' +
						'in your reference manager.\n\n' +
						'Do you want to save anyway?')) {
					cancel = true;
					return false;
				}
			}
		});

		if (cancel) {
			return false;
		}

		if (selfLink !== generatedStyleId || cslEditor.getStyleId() !== generatedStyleId) {
			if (confirm('Change style ID and "self" link to the following?\n\n' +
					generatedStyleId + "\n\n(the CSL styles repository convention)")) {
				cslEditor.setStyleId(generatedStyleId);
				if (typeof(selfLinkNode) !== "undefined") {
					selfLinkNode.setAttr("href", generatedStyleId);
					CSLEDIT.controller.exec("amendNode", [selfLinkNode.cslId, selfLinkNode]);
				} else {
					CSLEDIT.controller.exec("addNode", [CSLEDIT.data.getNodesFromPath("style/info")[0].cslId, "last",
						new CSLEDIT.CslNode("link", [
							{key: "rel", value: "self", enabled: true},
							{key: "href", value: generatedStyleId, enabled: true}
						])]);
				}
			}
		}
		return true;
	}