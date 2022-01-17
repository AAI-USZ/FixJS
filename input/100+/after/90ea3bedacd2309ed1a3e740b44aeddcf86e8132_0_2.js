function upload_button (activeCount, code) {
	jQuery("#content-add_media-"+code+"-"+activeCount).click(function() {
		formfield_img    = jQuery(this).siblings();
		formfield_title  = jQuery(jQuery(this).parents('tr').siblings().get(0)).find('td>input');
		formfield_sub    = jQuery(jQuery(this).parents('tr').siblings().get(1)).find('td>input');
		formfield_legend = jQuery(jQuery(this).parents('tr').siblings().get(2)).find('td>input');
		//tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
	});
}