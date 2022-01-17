function() {
	$('.image-label').hide();
	$('.loading-box').hide();
	$('.image-box').fadeIn('medium');
	$('.image-box')
	  .on('mouseenter', function() {
		  $(this).find('.image-label').fadeIn('fast');
	  })
	  .on('mouseleave', function() {
		  $(this).find('.image-label').fadeOut('fast');
	  });

	$('img').on('mousedown contextmenu', function(e) {
		e.preventDefault();
	});
}