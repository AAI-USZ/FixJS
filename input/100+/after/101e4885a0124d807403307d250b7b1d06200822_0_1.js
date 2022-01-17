function () {
				plugins.loadPlugins() ;
		
				if ( gentle.sequences.length == 0 ) gentle.showDefaultBlurb() ;
				
				if ( gentle.url_vars.newsequence !== undefined ) gentle.startNewSequenceDialog() ;
			}