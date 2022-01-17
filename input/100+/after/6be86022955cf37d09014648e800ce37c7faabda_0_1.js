function(e) {
						var origTitle = self.data('OrigVal');
						var title = self.val();
						self.data('OrigVal', title);

						// Criteria for defining a "new" page
						if ((url_segment.val().indexOf('new') == 0) && live_url_segment.val() == '') {
							self.updateURLSegment(title);
						} else {
							$('.update', self.parent()).show();
						}

						self.updateRelatedFields(title, origTitle);
						self.updateBreadcrumbLabel(title);
					}