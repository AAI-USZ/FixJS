function (event) {
				var target = $(event.target).closest("li[cslid]"),
					cslId = parseInt(target.attr('cslId'), 10);
				highlightOutput(cslId);
			}