function (jEvent, aEvent) {
						if(jQuery(Aloha.activeEditable.obj).hasClass('aloha-metaview')) {
							that.button.setPressed(true);
						} else {
							that.button.setPressed(false);
						}
					}