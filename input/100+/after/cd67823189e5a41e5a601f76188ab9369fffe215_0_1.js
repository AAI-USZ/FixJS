function() {
  //google-plus
  window.___gcfg = {lang: 'en-US'};
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
  
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