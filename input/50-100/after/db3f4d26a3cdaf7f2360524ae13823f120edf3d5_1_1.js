function() {
				var id = ed.getParam('wp_fullscreen_editor_id') || ed.getParam('fullscreen_editor_id') || ed.id,
					link = tinymce.DOM.select('#wp-' + id + '-media-buttons a.thickbox');

				if ( link && link[0] )
					link = link[0];
				else
					return;

				tb_show('', link.href);
			}