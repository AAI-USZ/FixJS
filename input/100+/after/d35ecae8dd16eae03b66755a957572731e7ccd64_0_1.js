function() {
	// disable spellchecking on all elements of class "code" in capable browsers
	var c = $(".code")[0];
	if(c && "spellcheck" in c) {$(".code").prop("spellcheck", false);}
	// enable spellcheck for all elements mentioned in textpattern.do_spellcheck
	c = $(textpattern.do_spellcheck)[0];
	if(c && "spellcheck" in c) {$(textpattern.do_spellcheck).prop("spellcheck", true);}
	// attach toggle behaviours
	$('.lever a[class!=pophelp]').click(toggleDisplayHref);
	$('.multi_edit_form').txpMultiEditForm();
	// establish AJAX timeout from prefs
	if($.ajaxSetup().timeout === undefined) {
		$.ajaxSetup( {timeout : textpattern.ajax_timeout} );
	}
	// setup async forms/hrefs, then arm UI
	if(!textpattern.ajaxally_challenged) {
		$('form.async').txpAsyncForm({
			error: function() {window.alert(textpattern.gTxt('form_submission_error'));}
		}).addClass('armed');
		$('a.async').txpAsyncHref({
			error: function() {window.alert(textpattern.gTxt('form_submission_error'));}
		}).addClass('armed');
	}
}