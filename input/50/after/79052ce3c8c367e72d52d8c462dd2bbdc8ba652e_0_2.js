function (event) {
			var target = $(event.target).closest("span[cslid]"),
				cslId = parseInt(target.attr('cslId'), 10);
			reverseSelectNode(cslId);
		}