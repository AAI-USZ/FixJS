function(setDefaults) {
				this._super();

				var linkType = this.find(':input[name=LinkType]:checked').val(), list = ['internal', 'external', 'file', 'email'];

				// If we haven't selected an existing link, then just make sure we default to "internal" for the link type.
				if(!linkType) {
					this.find(':input[name=LinkType]').val(['internal']);
					linkType = 'internal';
				}

				this.addAnchorSelector();

				// Toggle field visibility and state based on type selection
				this.find('div.content .field').hide();
				this.find('.field#LinkType').show();
				this.find('.field#' + linkType).show();
				if(linkType == 'internal' || linkType == 'anchor') this.find('.field#Anchor').show();
				if(linkType == 'anchor') {
					this.find('.field#AnchorSelector').show();
					this.find('.field#AnchorRefresh').show();
				}

				this.find(':input[name=TargetBlank]').attr('disabled', (linkType == 'email'));

				if(typeof setDefaults == 'undefined' || setDefaults) {
					this.find(':input[name=TargetBlank]').attr('checked', (linkType == 'file'));
				}
			}