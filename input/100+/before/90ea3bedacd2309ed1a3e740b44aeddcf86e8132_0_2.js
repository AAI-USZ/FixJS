function media_button (activeCount, code) {
	jQuery("#content-add_media-"+code+"-"+activeCount).click(function(){
		formfield_img = jQuery(this).siblings();
		formfield_title = jQuery(jQuery(this).parents('tr').siblings().get(0)).find('td>textarea')
		formfield_legend = jQuery(jQuery(this).parents('tr').siblings().get(1)).find('td>textarea')
	});
}