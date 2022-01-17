function () {

			if(navigator.userAgent.match(/Android/i)) {
				gentle.is_mobile = true ;
			}
			if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
				gentle.is_mobile = true ;
			}
			
			gentle.is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
			
			window.onorientationchange = gentle.on_resize_event ;
	
			gentle.setMenuState ( 'edit_menu_undo' , false ) ;
			gentle.setMenuState ( 'edit_menu_redo' , false ) ;
			gentle.setMenuState ( 'edit_menu_cut' , false ) ;
			gentle.setMenuState ( 'edit_menu_copy' , false ) ;
			gentle.setMenuState ( 'edit_menu_paste' , false ) ;
			gentle.setMenuState ( 'edit_menu_annotate' , false ) ;
	
			plugins.init() ;
			if ( undefined === gentle_config ) {
				gentle_config = { default_plugins : [] , deactivated_plugins : [] } ;
			}
			
			gentle.dragEntered = 0 ;
			gentle.url_vars = {} ;
			gentle.url_vars = gentle.getUrlVars ( gentle.url_vars ) ;
			gentle.plugins = plugins ;
			loadBaseData() ;
			gentle.updateSequenceList() ;
		
			if (window.File && window.FileReader && window.FileList && window.Blob) {
			} else if ( gentle.is_mobile ) {
				// Ignore iOS restrictions
			} else if ( undefined !== getBlobBuilder() ) { // Otherwise, we have already warned...
				gentle.addAlert ( 'error' , "This browser does not support reading local files. Try current <a href='http://www.mozilla.org/en-US/firefox/new/'>FireFox</a>, <a href='https://www.google.com/chrome/'>Google Chrome</a>, or similar." ) ;
			}
		
			$(window).bind('beforeunload', function(){ gentle.saveLocally () ; });
			$(window).bind('unload', function(){ gentle.saveLocally () ; });
			
			$('#main').height ( $('body').height()-50 ) ;
		
			$(window)
			.bind ( 'dragenter' , function ( evt ) {
				gentle.dragEntered++ ;
				if ( gentle.dragEntered == 1 ) $('#drop_zone').show() ;
			} )
			.bind ( 'dragleave' , function ( evt ) {
				gentle.dragEntered-- ;
				if ( gentle.dragEntered == 0 ) $('#drop_zone').hide() ;
			} ) ;
			
			$('#files').change ( gentle.handleFileSelect ) ;
			$('#drop_zone') .bind('dragover',function(evt){gentle.markDropArea(evt,true)})
							.bind('dragleave',function(evt){gentle.markDropArea(evt,false)})
							.bind('drop',gentle.handleFileDrop) ;
			
			gentle.loadLocally() ;
			plugins.loadPlugins() ;
	
			if ( gentle.sequences.length == 0 ) gentle.showDefaultBlurb() ;
			
			if ( gentle.url_vars.newsequence !== undefined ) gentle.startNewSequenceDialog() ;
		}