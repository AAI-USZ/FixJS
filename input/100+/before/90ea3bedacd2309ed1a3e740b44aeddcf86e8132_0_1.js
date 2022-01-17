function() {
	formfield_img = jQuery(this).siblings();
	formfield_title = jQuery(jQuery(this).parents('tr').siblings().get(0)).find('td>textarea')
	formfield_legend = jQuery(jQuery(this).parents('tr').siblings().get(1)).find('td>textarea')
	//tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
}