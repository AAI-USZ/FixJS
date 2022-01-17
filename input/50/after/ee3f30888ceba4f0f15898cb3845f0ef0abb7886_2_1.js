function(elm) {
		
		elm.ckeditor( function() { /* callback code */ }, {
			skin : 'kama',
			toolbar : 'Ajde',
			format_tags : 'p;h1;h2;h3;pre',
			width : elm.width()
		});
		
	}