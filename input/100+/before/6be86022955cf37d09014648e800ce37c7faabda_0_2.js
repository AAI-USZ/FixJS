function() {
				var self = this;
				
				var form = self.parents('form');
				var url_segment = $('.field.urlsegment', form).find(':text');
				var live_url_segment = $('input[name=LiveURLSegment]', form);
				
				self._addActions();

				if(url_segment.length > 0) {
					this.bind('change', function(e) {
						var title = self.val();
						// Criteria for defining a "new" page
						if ((url_segment.val().indexOf('new') == 0) && live_url_segment.val() == '') {
							self.updateRelatedFields(title);
							self.updateURLSegment(title);
						} else {
							$('.update', self.parent()).show();
						}
						self.updateBreadcrumbLabel(title);
					});
				}

				this._super();
			}