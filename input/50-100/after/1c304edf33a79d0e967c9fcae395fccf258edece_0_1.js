function popup_init() {
	popup_hide(true);
	var popup_id_list = ['popup_link_user', 'popup_link_status', 'popup_status_delete',
						'popup_status_retweet', 'popup_status_quote',
						'upopup_user_block', 'upopup_user_unblock', 'upopup_user_spam'];
	for (var x = 0; x < popup_id_list.length; x++)
		$(popup_id_list[x]).innerHTML = _($(popup_id_list[x]).innerHTML);
}