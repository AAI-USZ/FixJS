function update_save_themes_button () {
	jQuery("#save_themes").click("bind", function() {
		var translater = jQuery("#translater");
		var content = "";
		var i = 0;
		jQuery("#home_themes input").each(function (index) {
			if (i != 0) {
				content += "&";
			}
			content += jQuery(this).attr("name");
			content += "=";
			content += jQuery(this).attr("value");
			i++;
		});
		jQuery("#home_themes select").each(function () {
			content += "&";
			content += jQuery(this).attr("name");
			content += "=";
			content += jQuery(this).attr("value");
		});
		jQuery("#home_themes").append("<div class='message'>"+translater.attr("save")+"...</div>");
		jQuery.ajax({
			type: "post",
			url: "options.php",
			data: content,
			success: function(msg) {
				jQuery(".message").html(translater.attr("saved"));
				jQuery(".message").delay('1000').fadeOut('slow');
			},
			error: function(msg){
				jQuery(".message").html(translater.attr("saverr"));
				jQuery(".message").delay('1000').fadeOut('slow');
			}
		});
	});
}