function refresh_order(code) {
	var tables  = jQuery(".table-"+code);
	var titles  = jQuery(".title-"+code);
	var subs    = jQuery(".sub-"+code);
	var legends = jQuery(".legend-"+code);
	var urls    = jQuery(".url-"+code);
	var images  = jQuery(".image-"+code);
	var imgurl  = jQuery(".thickbox");
	var uplink  = jQuery(".up-"+code);
	var dwlink  = jQuery(".down-"+code);
	var buttons = jQuery(".remove_table-"+code);
	for (var i = 0; i < tables.length; i++) {
		jQuery(tables[i] ).attr("id"  , "form-table-"+code+"-"+i);
		jQuery(titles[i] ).attr("id"  , "title-"+code+"-"+i);
		jQuery(titles[i] ).attr("name", "title-"+code+"-"+i);
		jQuery(subs[i]   ).attr("id"  , "sub-"+code+"-"+i);
		jQuery(subs[i]   ).attr("name", "sub-"+code+"-"+i);
		jQuery(images[i] ).attr("id"  , "image-"+code+"-"+i);
		jQuery(images[i] ).attr("name", "image-"+code+"-"+i);
		jQuery(imgurl[i] ).attr("id"  , "content-add_media-"+i);
		jQuery(legends[i]).attr("id"  , "legend-"+code+"-"+i);
		jQuery(legends[i]).attr("name", "legend-"+code+"-"+i);
		jQuery(urls[i]   ).attr("id"  , "url-"+code+"-"+i);
		jQuery(urls[i]   ).attr("name", "url-"+code+"-"+i);
		jQuery(uplink[i] ).attr("id"  , "up-"+code+"-"+i);
		jQuery(uplink[i] ).attr("count", i);
		jQuery(dwlink[i] ).attr("id"  , "down-"+code+"-"+i);
		jQuery(dwlink[i] ).attr("count", i);
		jQuery(buttons[i]).attr("id"  , "remove_table-"+code+"-"+i);
		jQuery(buttons[i]).attr("name", "form-table-"+code+"-"+i);
	}
}