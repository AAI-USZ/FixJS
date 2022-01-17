function export_extension_select_filter()
{
	$('#export_extension_select_filter').addClass("pressed");
	$('#export_extension_tab_filter').css("display","block");
	
	$('#export_extension_select_location').removeClass("pressed");
	$('#export_extension_tab_location').css("display","none");
	$('#export_extension_select_timeformat').removeClass("pressed");
	$('#export_extension_tab_timeformat').css("display","none");
	
}