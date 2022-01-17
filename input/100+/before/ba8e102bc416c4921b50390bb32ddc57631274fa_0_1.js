function() {

$('#post_email').hide();

$('#post_line').keyup(function() {
	var count = $('#post_line').val().length;
	if (count >15) {
		$('#post_email').show();
	}
	$('#post_email').val()='to see how the story develops...';

	});


    


}