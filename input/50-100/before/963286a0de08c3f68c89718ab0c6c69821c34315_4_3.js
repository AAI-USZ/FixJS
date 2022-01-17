function xp_ext_select_timeformat()
{
	$('#xp_ext_select_timeformat').addClass("pressed");
	$('#xp_ext_tab_timeformat').css("display","block");

	$('#xp_ext_select_filter').removeClass("pressed");
	$('#xp_ext_tab_filter').css("display","none");
	$('#xp_ext_select_location').removeClass("pressed");
	$('#xp_ext_tab_location').css("display","none");
	
}