function(){

	$('#contact')
	   .validate({
         submitHandler: function(form) {
           $(form).ajaxSubmit({
                success: function() {
                    $('#contact').fadeOut(600);
                    $('span.success').delay(800).fadeIn(1000)//.delay(800).fadeOut(2000)
                }
           });

         }
        });
}