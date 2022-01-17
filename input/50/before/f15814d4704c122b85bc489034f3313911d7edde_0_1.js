function() {
						var $this = $(this),
							cslId;
					
						cslId = parseInt($this.attr(attribute));

						if (cslId >= parentId + numNodesInParent) {
							$this.attr(attribute, cslId + 1);
						}
					}