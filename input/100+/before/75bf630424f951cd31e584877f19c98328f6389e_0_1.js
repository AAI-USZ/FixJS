function () {
				// Prepare
				var me = this;

				if ( typeof this.settings.hotKey != 'undefined' ) {
					jQuery.extend(true, this.hotKey, this.settings.hotKey);
				}

				this.initButtons();

				Aloha.ready( function () {
					// @todo add config option for sidebar panel
					me.initSidebar( Aloha.Sidebar.right ); 
				} );

				// apply specific configuration if an editable has been activated
				Aloha.bind('aloha-editable-activated',function (e, params) {
					me.applyButtonConfig(params.editable.obj);

					// handle hotKeys
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatBold, function() { me.addMarkup( 'b' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatItalic, function() { me.addMarkup( 'i' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatParagraph, function() { me.changeMarkup( 'p' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatH1, function() { me.changeMarkup( 'h1' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatH2, function() { me.changeMarkup( 'h2' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatH3, function() { me.changeMarkup( 'h3' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatH4, function() { me.changeMarkup( 'h4' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatH5, function() { me.changeMarkup( 'h5' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatH6, function() { me.changeMarkup( 'h6' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatPre, function() { me.changeMarkup( 'pre' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatDel, function() { me.addMarkup( 'del' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatSub, function() { me.addMarkup( 'sub' ); return false; });
					params.editable.obj.bind( 'keydown.aloha.format', me.hotKey.formatSup, function() { me.addMarkup( 'sup' ); return false; });
				});


				Aloha.bind('aloha-editable-deactivated',function (e, params) {
					params.editable.obj.unbind('keydown.aloha.format');
				});
			}