functions[mode]](code, function(errors) {
							if (cwin.txt.previousErrors) for (var i = 0; i < cwin.txt.previousErrors.length; i++) {
								cwin.txt.editor.clearMarker(cwin.txt.previousErrors[i].line - 1);
								cwin.el.removeClassName("error");
							}
							if (errors) {
								for (var i = 0; i < errors.length; i++) {
									var info = cwin.txt.editor.lineInfo(errors[i].line - 1);
									if (info && !info.markerText) {
										cwin.txt.editor.setMarker(errors[i].line - 1, "<span class='error' title=\""+errors[i].message.replace(/"/g, "''")+"\"><span>&bull;</span></span>"+errors[i].line);
									}
								}
								cwin.el.addClassName("error");
								cwin.el.down(".blockable").title = errors[i].message;

								cwin.txt.previousErrors = errors;
							} else {
								cwin.el.removeClassName("error");
                            }
						}