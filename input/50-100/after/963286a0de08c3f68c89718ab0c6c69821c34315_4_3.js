function export_extension_select_timeformat()
{
	$('#export_extension_select_timeformat').addClass("pressed");
	$('#export_extension_tab_timeformat').css("display","block");

	$('#export_extension_select_filter').removeClass("pressed");
	$('#export_extension_tab_filter').css("display","none");
	$('#export_extension_select_location').removeClass("pressed");
	$('#export_extension_tab_location').css("display","none");
	
}