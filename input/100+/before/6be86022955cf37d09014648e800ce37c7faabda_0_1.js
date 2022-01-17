function(e) {
						var title = self.val();
						// Criteria for defining a "new" page
						if ((url_segment.val().indexOf('new') == 0) && live_url_segment.val() == '') {
							self.updateRelatedFields(title);
							self.updateURLSegment(title);
						} else {
							$('.update', self.parent()).show();
						}
						self.updateBreadcrumbLabel(title);
					}