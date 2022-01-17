function ( event ) {
				var config = that.getEditableConfig( Aloha.activeEditable.obj );

				if ( config[0] ) {
					config = config[0];
				}

			   if ( typeof config.numeratedactive !== 'undefined' ) {
					that.numeratedactive = config.numeratedactive;
				}

			   // modifyable selector for the headers, that should be numerated
			   if ( typeof config.headingselector !== 'undefined' ) {
					that.headingselector = config.headingselector;
				}
			   // modifyable selector for the baseobject. Where should be numerated
			   if ( typeof config.baseobjectSelector !== 'undefined' ) {
					that.baseobjectSelector = config.baseobjectSelector;
				}

				if ( that.numeratedactive != true && that.numeratedHeadersButton ) {
					that.numeratedHeadersButton.hide();
				}
			}