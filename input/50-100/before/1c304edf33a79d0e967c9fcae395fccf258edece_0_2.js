function popup_hide() {
	callPlugins("popup_hide");
	$('popup').style.display = 'none';
	$('userinfo_popup').style.display = 'none';
	$('popup_hide').style.display = 'none';
	popup_user = popup_id = popup_ele = null;
}