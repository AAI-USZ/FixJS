function (event) {
			var target = $(event.target).closest("span[cslid]"),
				cslId = parseInt(target.attr('cslId'));
			reverseSelectNode(cslId);
		}