function xp_ext_select_location()
{
	$('#xp_ext_select_location').addClass("pressed");
	$('#xp_ext_tab_location').css("display","block");

	$('#xp_ext_select_filter').removeClass("pressed");
	$('#xp_ext_tab_filter').css("display","none");
	$('#xp_ext_select_timeformat').removeClass("pressed");
	$('#xp_ext_tab_timeformat').css("display","none");
}