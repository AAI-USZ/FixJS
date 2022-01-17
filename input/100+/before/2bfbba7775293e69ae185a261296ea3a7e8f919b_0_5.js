function correctionUI() {
	$("#early_cancel" + num_corr).hide();
	var txt = "";
	$(".word").each(function() {
		if ($(this).hasClass("highlight")) {
			txt += $(this).text() + " ";
		}
	});
	if (highlighting_mode == "pair") {
		var pair = txt.split(/\s/);
		txt = pair[0] + "..." + pair[1];
	}
	if (current_step == "delete") {
		txt = revert_word;
	}
	var text = "";
	if (highlighting_mode != "insert") {
		text = '<table><tr><td id="corr_text' + num_corr
				+ '"><div id="corr_div'+num_corr+'" class="corrected_word">' + txt + '</div>';
	} else {
		text = '<td id="corr_text' + num_corr + '">';
	}
	text += promptForType();
	text += getButtons();
	text += '</tr></table>';
//	$('#C' + num_corr).after(text);
	$('#prevNext').after(text);
	enableDropDown();
}