function() {
	$('#chatWindow').toggle();
	// Toggle arrow from > to <, and on the contrary
	$('#arrow').html((undefined != $('#chatWindow:visible').val() ? '&lt;' : '&gt;'));
}