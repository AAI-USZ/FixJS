function export_extension_select_location()
{
	$('#export_extension_select_location').addClass("pressed");
	$('#export_extension_tab_location').css("display","block");

	$('#export_extension_select_filter').removeClass("pressed");
	$('#export_extension_tab_filter').css("display","none");
	$('#export_extension_select_timeformat').removeClass("pressed");
	$('#export_extension_tab_timeformat').css("display","none");
}