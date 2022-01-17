function(ed, o) {
							if (ed.isDirty()) {
								ed.save();
								ngModel.$setViewValue(element.val());
								scope.$apply();
							}
						}