function() {

$('#post_email').hide();
$('#email').hide();

$('#post_line').keyup(function() {
	var count = $('#post_line').val().length;
	$('#counter').html(100-count);
	if (count > 20) {
		$('#post_email').show();
		$('#email').show();

	}
	$('#post_email').val()='to see how the story develops...';

	});



    


}