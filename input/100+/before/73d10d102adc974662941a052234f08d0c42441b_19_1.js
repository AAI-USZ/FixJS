function () {
		var cslData = CSLEDIT.data.get();

		if (verifyAllChanges) {
			console.time("verifyTree");
			// Check for inconsistencies with CSLEDIT.data
			treeElement.find('li[cslid]').each(function () {
				var $this = $(this),
					cslId;

				cslId = parseInt($this.attr('cslid'));
				assertEqual(CSLEDIT.data.getNode(cslId, cslData).name, $this.attr('rel'));
			});

			// Can't have non-macrolink nodes as children of a text node
			assertEqual(treeElement.find('li[cslid][rel=text] li[macrolink!=true]').length, 0);
			console.timeEnd("verifyTree");
		}
	}