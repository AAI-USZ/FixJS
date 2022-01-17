function() {
				// Remove whitespace to avoid gaps with inline elements
				this.contents().filter(function() { 
					return (this.nodeType == 3 && !/\S/.test(this.nodeValue)); 
				}).remove();

				// Init buttons if required
				this.find('.ss-ui-button').each(function() {
					if(!$(this).data('button')) $(this).button();
				});
				
				// Mark up buttonsets
				this.find('.ss-ui-buttonset').buttonset();
			}