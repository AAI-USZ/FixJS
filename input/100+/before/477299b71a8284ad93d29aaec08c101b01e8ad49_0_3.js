function() {
	var tab_pays = new Array();
	var cpt = new Array();
	var separator = new Array();

	jQuery("div#code").each(function (index) {
		//alert (jQuery(this).attr("code_pays"));
		tab_pays[index] = jQuery(this).attr("code_pays")
	});
	content = jQuery("#content_home").serializeArray();
	jQuery.each(tab_pays,function (index_pays, value_pays) {
		jQuery("#home_content_"+value_pays).val('[');
		cpt[index_pays] = 0;
		separator[index_pays] = value_pays + '_';
	});

	jQuery(content).each(function(ind, el){
		jQuery.each(tab_pays,function (index_pays, value_pays)
		{
			//alert("index="+ind + "; el="+JSON.stringify(el));
			if(el.name.match(separator[index_pays])){
				//alert("index="+ind + "; el="+JSON.stringify(el));
				if(cpt[index_pays] == 0){
					jQuery("#home_content_"+value_pays).val(jQuery("#home_content_"+value_pays).val()+JSON.stringify(el));
					cpt[index_pays]++;
				}
				else{
					jQuery("#home_content_"+value_pays).val(jQuery("#home_content_"+value_pays).val() +","+JSON.stringify(el));
					cpt[index_pays]++;
				}
			}
		});
	});

	jQuery.each(tab_pays,function (index_pays, value_pays) {
		jQuery("#home_content_"+value_pays).val(jQuery("#home_content_"+value_pays).val() +']');
	});
	jQuery("#home_handler").append("<div class='message'>Sauvegarde en cours...</div>");
	jQuery.ajax({
		type: "POST",
		url: "options.php",
		data: jQuery("#home_handler").serialize(),
		success: function(msg) {
			jQuery(".message").html("Sauvegardé");
			jQuery(".message").delay('1000').fadeOut('slow');
		},
		error: function(msg){
			jQuery(".message").html("Oups, une erreur s'est produite :( ...");
			jQuery(".message").delay('1000').fadeOut('slow');
		}
	});

}