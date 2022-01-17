function() {
	ad_codes.push($(this).parent().parent().attr("afc_ad_id"));
	ad_number--;
    $(this).parent().parent().fadeOut().remove();
	if (ad_number == 1) {
	  chrome.extension.sendMessage({action: "blacklist_current_site", "url": url });
	}
	save_ad_positions();
  }