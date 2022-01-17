function update_preview() {
	var translater = jQuery("#translater");
	var current = jQuery('#select_themes option:selected').val();
	var screenshot = "";
	
	var allText = "";
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", "../wp-content/plugins/wp-multilingual-slider/themes/"+current+"/README.mdown", true);
	txtFile.onreadystatechange = function() {
  		if (txtFile.readyState === 4) {
    		if (txtFile.status === 200) {
      		allText = txtFile.responseText; 
				var converter = new Showdown.converter();
				var html = converter.makeHtml(allText);
				jQuery("#current-theme").append(
					'<div style="float: right;width: 50%;height: 500px;border: solid 1px;overflow-y: scroll;overflow-x: auto;position: absolute;top: 50px;right: 0px;background: #EEE;">'+html+'</div>'
				);
    		}
  		}
	}
	txtFile.send(null);

	jQuery("#current-theme").remove();
	if (jQuery("#select_themes option:selected").attr("screenshot") == "true") {
		screenshot = '<img id="theme_preview" src="../wp-content/plugins/wp-multilingual-slider/themes/'+current+'/screenshot.png" />';
	}
	jQuery("#select_themes").after(
		'<div id="current-theme" class="has-screenshot">'+
			screenshot+
			'<h3>Selected theme</h3>'+
			'<h4>'+current+'</h4>'+
			'<button type="button" id="save_themes" class="button-primary">'+translater.attr("savbut")+'</button>'+
		'</div>'
	);
	update_save_themes_button();
}