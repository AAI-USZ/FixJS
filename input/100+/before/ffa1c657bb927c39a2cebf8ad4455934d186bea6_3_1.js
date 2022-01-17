function (jEvent, aEvent) {
						var config;
						config = that.getEditableConfig( Aloha.activeEditable.obj );
						if ( jQuery.inArray( 'metaview', config ) !== -1 ) {
							that.button.show();
						} else {
							that.button.hide();
							return;
						}
						
						if( that.button && jQuery(Aloha.activeEditable.obj).hasClass('aloha-metaview')) {
							that.button.setPressed(true);
						} else {
							that.button.setPressed(false);
						}
					}