function load_body(){
	document.form.next_host.value = location.host;
	if(document.form.current_page.value == "Advanced_WAdvanced_Content.asp"){
		//document.form.wl_wme.options[0].selected = 0;
		//document.form.wl_wme.options[1].selected = 1;		

		if(sw_mode != "2"){
			if(document.form.wl_gmode.value == "1")
				inputCtrl(document.form.wl_wme, 0);
			
			change_common(document.form.wl_wme, "WLANConfig11b", "wl_wme");
			
			if (document.form.wl_gmode.value!="2" && document.form.wl_gmode.value!="1"){ 
				inputCtrl(document.form.HT_OpMode, 0);
			}
		}

		if (isBand() == 'b') inputCtrl(document.form.wl_frameburst, 0);
		document.form.wl_radio_date_x_Sun.checked = getDateCheck(document.form.wl_radio_date_x.value, 0);
		document.form.wl_radio_date_x_Mon.checked = getDateCheck(document.form.wl_radio_date_x.value, 1);
		document.form.wl_radio_date_x_Tue.checked = getDateCheck(document.form.wl_radio_date_x.value, 2);
		document.form.wl_radio_date_x_Wed.checked = getDateCheck(document.form.wl_radio_date_x.value, 3);
		document.form.wl_radio_date_x_Thu.checked = getDateCheck(document.form.wl_radio_date_x.value, 4);
		document.form.wl_radio_date_x_Fri.checked = getDateCheck(document.form.wl_radio_date_x.value, 5);
		document.form.wl_radio_date_x_Sat.checked = getDateCheck(document.form.wl_radio_date_x.value, 6);
		document.form.wl_radio_time_x_starthour.value = getTimeRange(document.form.wl_radio_time_x.value, 0);
		document.form.wl_radio_time_x_startmin.value = getTimeRange(document.form.wl_radio_time_x.value, 1);
		document.form.wl_radio_time_x_endhour.value = getTimeRange(document.form.wl_radio_time_x.value, 2);
		document.form.wl_radio_time_x_endmin.value = getTimeRange(document.form.wl_radio_time_x.value, 3);
	}
	else if (document.form.current_page.value == "Advanced_PortTrigger_Content.asp")
	{
wItem = new Array(
new Array("Quicktime 4 Client", "554", "TCP", "6970:32000", "UDP"),
new Array("Real Audio", "7070", "TCP", "6970:7170", "UDP"));
free_options(document.form.TriggerKnownApps);
add_option(document.form.TriggerKnownApps, "<#Select_menu_default#>", "User Defined", 1);
for (i = 0; i < wItem.length; i++)
{add_option(document.form.TriggerKnownApps, wItem[i][0], wItem[i][0], 0);
}
}
else if (document.form.current_page.value == "Advanced_BasicFirewall_Content.asp")
{change_firewall(rcheck(document.form.fw_enable_x));
}
	else if (document.form.current_page.value == "Advanced_Firewall_Content.asp")
{wItem = new Array(
new Array("WWW", "80", "TCP"),
new Array("TELNET", "23", "TCP"),
new Array("FTP", "20:21", "TCP")
);
free_options(document.form.LWKnownApps);
add_option(document.form.LWKnownApps, "User Defined", "User Defined", 1);
for (i = 0; i < wItem.length; i++)
{add_option(document.form.LWKnownApps, wItem[i][0], wItem[i][0], 0);
}
document.form.filter_lw_date_x_Sun.checked = getDateCheck(document.form.filter_lw_date_x.value, 0);
document.form.filter_lw_date_x_Mon.checked = getDateCheck(document.form.filter_lw_date_x.value, 1);
document.form.filter_lw_date_x_Tue.checked = getDateCheck(document.form.filter_lw_date_x.value, 2);
document.form.filter_lw_date_x_Wed.checked = getDateCheck(document.form.filter_lw_date_x.value, 3);
document.form.filter_lw_date_x_Thu.checked = getDateCheck(document.form.filter_lw_date_x.value, 4);
document.form.filter_lw_date_x_Fri.checked = getDateCheck(document.form.filter_lw_date_x.value, 5);
document.form.filter_lw_date_x_Sat.checked = getDateCheck(document.form.filter_lw_date_x.value, 6);
document.form.filter_lw_time_x_starthour.value = getTimeRange(document.form.filter_lw_time_x.value, 0);
document.form.filter_lw_time_x_startmin.value = getTimeRange(document.form.filter_lw_time_x.value, 1);
document.form.filter_lw_time_x_endhour.value = getTimeRange(document.form.filter_lw_time_x.value, 2);
document.form.filter_lw_time_x_endmin.value = getTimeRange(document.form.filter_lw_time_x.value, 3);
document.form.filter_lw_time_x_1_starthour.value = getTimeRange(document.form.filter_lw_time_x_1.value, 0);	//Viz add 2011.11
document.form.filter_lw_time_x_1_startmin.value = getTimeRange(document.form.filter_lw_time_x_1.value, 1);
document.form.filter_lw_time_x_1_endhour.value = getTimeRange(document.form.filter_lw_time_x_1.value, 2);
document.form.filter_lw_time_x_1_endmin.value = getTimeRange(document.form.filter_lw_time_x_1.value, 3);
}
else if (document.form.current_page.value == "Advanced_LFirewall_Content.asp")
{document.form.FirewallConfig_WanLocalActiveDate_Sun.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 0);
document.form.FirewallConfig_WanLocalActiveDate_Mon.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 1);
document.form.FirewallConfig_WanLocalActiveDate_Tue.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 2);
document.form.FirewallConfig_WanLocalActiveDate_Wed.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 3);
document.form.FirewallConfig_WanLocalActiveDate_Thu.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 4);
document.form.FirewallConfig_WanLocalActiveDate_Fri.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 5);
document.form.FirewallConfig_WanLocalActiveDate_Sat.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 6);
document.form.FirewallConfig_WanLocalActiveTime_starthour.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 0);
document.form.FirewallConfig_WanLocalActiveTime_startmin.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 1);
document.form.FirewallConfig_WanLocalActiveTime_endhour.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 2);
document.form.FirewallConfig_WanLocalActiveTime_endmin.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 3);
}
else if (document.form.current_page.value == "Advanced_URLFilter_Content.asp")
{document.form.url_date_x_Sun.checked = getDateCheck(document.form.url_date_x.value, 0);
document.form.url_date_x_Mon.checked = getDateCheck(document.form.url_date_x.value, 1);
document.form.url_date_x_Tue.checked = getDateCheck(document.form.url_date_x.value, 2);
document.form.url_date_x_Wed.checked = getDateCheck(document.form.url_date_x.value, 3);
document.form.url_date_x_Thu.checked = getDateCheck(document.form.url_date_x.value, 4);
document.form.url_date_x_Fri.checked = getDateCheck(document.form.url_date_x.value, 5);
document.form.url_date_x_Sat.checked = getDateCheck(document.form.url_date_x.value, 6);
document.form.url_time_x_starthour.value = getTimeRange(document.form.url_time_x.value, 0);
document.form.url_time_x_startmin.value = getTimeRange(document.form.url_time_x.value, 1);
document.form.url_time_x_endhour.value = getTimeRange(document.form.url_time_x.value, 2);
document.form.url_time_x_endmin.value = getTimeRange(document.form.url_time_x.value, 3);
document.form.url_time_x_starthour_1.value = getTimeRange(document.form.url_time_x_1.value, 0);
document.form.url_time_x_startmin_1.value = getTimeRange(document.form.url_time_x_1.value, 1);
document.form.url_time_x_endhour_1.value = getTimeRange(document.form.url_time_x_1.value, 2);
document.form.url_time_x_endmin_1.value = getTimeRange(document.form.url_time_x_1.value, 3);
}
else if (document.form.current_page.value == "Advanced_KeywordFilter_Content.asp")
{document.form.keyword_date_x_Sun.checked = getDateCheck(document.form.keyword_date_x.value, 0);
document.form.keyword_date_x_Mon.checked = getDateCheck(document.form.keyword_date_x.value, 1);
document.form.keyword_date_x_Tue.checked = getDateCheck(document.form.keyword_date_x.value, 2);
document.form.keyword_date_x_Wed.checked = getDateCheck(document.form.keyword_date_x.value, 3);
document.form.keyword_date_x_Thu.checked = getDateCheck(document.form.keyword_date_x.value, 4);
document.form.keyword_date_x_Fri.checked = getDateCheck(document.form.keyword_date_x.value, 5);
document.form.keyword_date_x_Sat.checked = getDateCheck(document.form.keyword_date_x.value, 6);
document.form.keyword_time_x_starthour.value = getTimeRange(document.form.keyword_time_x.value, 0);
document.form.keyword_time_x_startmin.value = getTimeRange(document.form.keyword_time_x.value, 1);
document.form.keyword_time_x_endhour.value = getTimeRange(document.form.keyword_time_x.value, 2);
document.form.keyword_time_x_endmin.value = getTimeRange(document.form.keyword_time_x.value, 3);
document.form.keyword_time_x_starthour_1.value = getTimeRange(document.form.keyword_time_x_1.value, 0);
document.form.keyword_time_x_startmin_1.value = getTimeRange(document.form.keyword_time_x_1.value, 1);
document.form.keyword_time_x_endhour_1.value = getTimeRange(document.form.keyword_time_x_1.value, 2);
document.form.keyword_time_x_endmin_1.value = getTimeRange(document.form.keyword_time_x_1.value, 3);
}
else if (document.form.current_page.value == "Advanced_DHCP_Content.asp" ||
document.form.current_page.value == "Advanced_RDHCP_Content.asp")
{final_flag = 1;
}
else if (document.form.current_page.value == "Advanced_DDNS_Content.asp")
{}
else if (document.form.current_page.value == "Main_GStatus_Content.asp")
{}
else if (document.form.current_page.value == "Advanced_QOSUserSpec_Content.asp")
{
	if (document.form.qos_dfragment_enable_w.checked == true)
		{inputCtrl(document.form.qos_dfragment_size, 1);
	}
	else{
		inputCtrl(document.form.qos_dfragment_size, 0);
	}
}
change = 0;
}