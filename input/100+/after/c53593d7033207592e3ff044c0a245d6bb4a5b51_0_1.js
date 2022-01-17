function() {
	$('.image-label').hide();
	$('.image-area').show();
	$('.image-box')
	  .on('mouseenter', function() {
		  $(this).find('.image-label').fadeIn('fast');
	  })
	  .on('mouseleave', function() {
		  $(this).find('.image-label').fadeOut('fast');
	  });

	$('img').on('mousedown', function(e) {
    e.preventDefault();
	});
}