function (index) {
		var code = jQuery(this).attr("code_pays");
		content = JSON.stringify(jQuery("#content_home-"+code).serializeArray());
		jQuery("#home_content\\["+code+"\\]").attr("value", content);
	}