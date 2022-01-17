function(e) {
		// Get the hash (fragment) as a string, with any leading # removed. Note that
		// in jQuery 1.4, you should use e.fragment instead of $.param.fragment().
		var hash = $.param.fragment();
		
		// Remove .bbq-current class from any previously "current" link(s).
		$( 'a.bbq-current' ).removeClass( 'bbq-current' );
		
		// Hide any visible ajax content.
		//$( '.bbq-content' ).children( ':visible' ).hide();
		
		if (hash === '' && jQuery('#changable_content').text().trim().length == 0){
			hash = 'site/index';
		}
		if (hash !== '' && hash != glob.lastHash){
			// Add .bbq-current class to "current" nav link(s), only if url isn't empty.
			hash && $( 'a[href="#' + hash + '"]' ).addClass( 'bbq-current' );
			
			 // Show "loading" content while AJAX content loads.
			$( '.bbq-loading' ).show();
			
			url = glob.hashToUrl(hash);
			
			jQuery.fancybox.close();
			
			jQuery.ajax({
				'type':'get',
				'url':url,
				'cache':false,
				'success':function(data){
					// Content loaded, hide "loading" content.
					$( '.bbq-loading' ).hide();
					glob.lastHash = hash;
					ajaxResponceHandler(data, 'hash');
					_gaq.push(['_trackPageview', hash]);
				},
				'error':function(xhr){
					// Content loaded, hide "loading" content.
					$( '.bbq-loading' ).hide();
					glob.lastHash = hash;
					//xhr.status
					//xhr.statusText
					ajaxResponceHandler(xhr.responseText, 'hash');
					_gaq.push(['_trackPageview', hash]);
				},
			});
			
			/*
			$('#changable_content').load( url, function(){
				// Content loaded, hide "loading" content.
				$( '.bbq-loading' ).hide();
				glob.lastHash = hash;
			});*/
		}
	}