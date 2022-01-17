function() {
						var $this = $(this),
							cslId;
					
						cslId = parseInt($this.attr(attribute));

						if (cslId >= parentId + numChildNodes) {
							$this.attr(attribute, cslId + 1);
						}
					}