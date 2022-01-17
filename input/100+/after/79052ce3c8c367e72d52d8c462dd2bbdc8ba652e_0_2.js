function (event) {
				var target = $(event.target),
					liElement = target.closest("li[cslid]"),
					cslId = parseInt(liElement.attr('cslId'), 10),
					nodeAndParent = CSLEDIT.data.getNodeAndParent(cslId),
					documentation;
				
				if (nodeAndParent.parent === null) {
					documentation = CSLEDIT.schema.documentation('root/' + nodeAndParent.node.name);
				} else {
					documentation = CSLEDIT.schema.documentation(
						nodeAndParent.parent.name + '/' + nodeAndParent.node.name);
				}

				if (documentation !== "") {
					target.attr("title", nodeAndParent.node.name + "\n\n" + documentation);
				}
			}