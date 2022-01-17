function() {
	
	/**
	 * FancyBox Call
	 */
	ajax_fancybox( $(".fancybox") );
	
	// $(".call-to-action .fancybox").trigger('click');
	
	/**
	 * Mobile Orientation and Scale Fix
	 */
	mobileOrientationScale();

	/**
	 * Desktop, Tablet, Phone classes
	 */
	responsiveClasses();
	resizeTrigger(responsiveClasses);
	
	/**
	 * Equal Heights
	 */
	 equalHeight( $(".footer .inner") );
	
	/**
	 * Masonry
	 */
	var $container = $('#blog-listing');
	$container.imagesLoaded(function(){
		$container.masonry({
			// options
			itemSelector : '.blog-post',
			columnWidth : 300,
			gutterWidth : 20
		});
	});
	
	/**
	 * Services Tabs
	 */
	 $('.processes').each(function() {
	 	
	 	var triggers = $(this).find('.process a'),
	 		content = $(this).find('.process-details');
	 	
		triggers.click(function() {
			 
			 // Hide shit
			 triggers.removeClass('active');
			 content.hide();
			 
			 // Display the selected item
			 $(this).addClass('active');
			 var href = $(this).attr('href');
			 $(href).show();
			 
			 // Disable default
			 return false;
		 });
	 });
	
}