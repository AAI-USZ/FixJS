function xp_ext_select_filter()
{
	$('#xp_ext_select_filter').addClass("pressed");
	$('#xp_ext_tab_filter').css("display","block");
	
	$('#xp_ext_select_location').removeClass("pressed");
	$('#xp_ext_tab_location').css("display","none");
	$('#xp_ext_select_timeformat').removeClass("pressed");
	$('#xp_ext_tab_timeformat').css("display","none");
	
}