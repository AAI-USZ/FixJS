function(ed, o) {
							if (ed.isDirty()) {
								ed.save();
								ngModel.$setViewValue(elm.val());
								scope.$apply();
							}
						}