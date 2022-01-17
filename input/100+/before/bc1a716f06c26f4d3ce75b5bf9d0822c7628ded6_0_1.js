function update_preview() {
	var current = jQuery('#select_themes option:selected').val();
	var screenshot = "";
	jQuery("#current-theme").remove();
	if (jQuery("#select_themes option:selected").attr("screenshot") == "true") {
		screenshot = '<img id="theme_preview" src="../wp-content/plugins/wp-multilingual-slider/themes/'+current+'/screenshot.png" />';
	}
	jQuery("#select_themes").after(
		'<div id="current-theme" class="has-screenshot">'+
			screenshot+
			'<h3>Selected theme</h3>'+
			'<h4>'+current+'</h4>'+
		'</div>'
	);
}