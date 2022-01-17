function() {
	$(".disabledSelection :not(.enabledSelection)").disableSelection();
	$.datepicker.setDefaults( $.datepicker.regional[ "<%$current_language%>" ] );
	$('input[type="text"].datepicker').datepicker();
	$('input[type="text"].datetimepicker').datetimepicker();

	$(".controlnavigation li").hover(function(){
		$(this).find(".dropdownbox").show();
	},function(){
		$(this).find(".dropdownbox").hide();
	});

	$('.wysiwyg_bbcode').sceditorBBCodePlugin();
	process_form_buttons();
}