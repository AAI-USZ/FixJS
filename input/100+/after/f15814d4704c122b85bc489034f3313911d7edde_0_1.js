function () {
			var cslId,
				parentId,
				type,
				nodeName,
				thisNode,
				index,
				parentNode,
				numChildNodes;

			cslId = parseInt($this.attr("cslid"));
			parentId = parseInt($this.attr("parentcslid"));
			type = $this.attr("type");
			nodeName = $this.attr("nodename");

			thisNode = new CSLEDIT.CslNode(nodeName);
			if (!isNaN(cslId)) {
				thisNode.copy(CSLEDIT.data.getNode(cslId));
			}

			if (type === "textValue") {
				thisNode.textValue = $this.val();
			} else {
				thisNode.setAttr(type, $this.val()); 
			}

			if (isNaN(cslId)) {
				CSLEDIT.viewController.setSuppressSelectNode(true);
				executeCommand('addNode', [parentId, "last", thisNode]);
				CSLEDIT.viewController.setSuppressSelectNode(false);
				parentNode = CSLEDIT.data.getNode(parentId);
				numChildNodes = CSLEDIT.data.numNodes(parentNode) - 1;

				// update all cslids
				$.each(["cslid", "parentcslid"], function (i, attribute) {
					panel.find('input[' + attribute + ']').each(function() {
						var $this = $(this),
							cslId;
					
						cslId = parseInt($this.attr(attribute));

						if (cslId >= parentId + numChildNodes) {
							$this.attr(attribute, cslId + 1);
						}
					});
				});

				// set added node cslid
				$this.removeAttr("parentcslid");
				$this.attr("cslid", parentId + numChildNodes);
			} else {
				executeCommand('amendNode', [cslId, thisNode]);
			}
		}