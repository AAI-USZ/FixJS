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
	
	var editor_styles = [];
	$('head > link[type="text/css"]').each(function() {
		editor_styles.push($(this).attr('href'));
	});
	
	editor_styles.push(Soopfw.config.template_path+'/css/jquery.sceditor.overrides.css');
	$('.wysiwyg_bbcode:not(.soopfw-proccessed)').sceditorBBCodePlugin({
		style: editor_styles
	});
	$('.wysiwyg_bbcode:not(.soopfw-proccessed)').addClass("soopfw-proccessed");
	process_form_buttons();
}