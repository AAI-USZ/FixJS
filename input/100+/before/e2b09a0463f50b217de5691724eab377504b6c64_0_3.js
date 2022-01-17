function(){
		var value = jQuery(this).val();
		var link = jQuery('.NutrientDataSelect');
		glob.changeLinkUrlParam(link, 'query', value);
		
		link = jQuery('#lookOnFlickr');
		glob.changeLinkUrlParam(link, 'q', value);
	}