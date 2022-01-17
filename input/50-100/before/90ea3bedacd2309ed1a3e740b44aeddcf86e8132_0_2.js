function (index) {
		content = JSON.stringify(jQuery("#content_home").serializeArray());
		jQuery("#home_content\\["+jQuery(this).attr("code_pays")+"\\]").attr("value", content);
	}