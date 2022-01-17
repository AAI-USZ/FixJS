function() {
				this._super();

				var linkType = this.find(':input[name=LinkType]:checked').val(), list = ['internal', 'external', 'file', 'email'];

				this.addAnchorSelector();

				// Toggle field visibility depending on the link type.
				this.find('div.content .field').hide();
				this.find('.field#LinkType').show();
				this.find('.field#' + linkType).show();
				if(linkType == 'internal' || linkType == 'anchor') this.find('.field#Anchor').show();
				if(linkType !== 'email') this.find('.field#TargetBlank').show();
				if(linkType == 'anchor') {
					this.find('.field#AnchorSelector').show();
					this.find('.field#AnchorRefresh').show();
				}
			}