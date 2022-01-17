function(plugin_list){
			if ( plugin_list ) {
				plugin_list = JSON.parse ( plugin_list ) ;
				plugins.load_on_start = gentle_config.default_plugins ;
				$.each ( plugin_list.all , function ( k , v ) { plugins.load_on_start.push ( k ) ; } ) ;
				plugins.load_on_start = jQuery.unique ( plugins.load_on_start ) ;
				plugins.deactivated = plugin_list.deactivated ;
				plugins.loadPlugins() ;
			} else {
				plugins.load_on_start = gentle_config.default_plugins ;
			}
		}