function(ed, url) {
			var disabled = true;

			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('WP_Link', function() {
				if ( disabled )
					return;
				ed.windowManager.open({
					id : 'wp-link',
					width : 480,
					height : "auto",
					wpDialog : true,
					title : ed.getLang('advlink.link_desc')
				}, {
					plugin_url : url // Plugin absolute URL
				});
			});

			// Register example button
			ed.addButton('link', {
				title : 'advanced.link_desc',
				cmd : 'WP_Link'
			});

			ed.onNodeChange.add(function(ed, cm, n, co) {
				disabled = co && n.nodeName != 'A';
			});
		}