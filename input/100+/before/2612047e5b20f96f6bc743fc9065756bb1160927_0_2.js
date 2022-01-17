function cleanUpChange() {
	if (highlighting_mode == "pair") {
		$("#corr_text" + num_corr).after('<table><tr><td><div class="corrected_word">'
		+ $("#corr_div" + num_corr).text() + '</div></td>'
		+'<td class="change"><div width="14"> changed to </div></td>'
		+ '<td class="change"><div class="corrected_word">'
		+ $("#inputC" + num_corr).val() + " ... "
		+ $("#inputC" + num_corr + '_b').val() + '</div></td>'
		+ '<td><div class="corrected_word">'
		+$('#chosenErr'+num_corr).text()+'</div></td></tr></table>');
		$("#inputC" + num_corr + '_b').hide();
		$("#corr_text" + num_corr).hide();
	} else {
		$("#corr_text" + num_corr).after('<table><tr><td><div class="corrected_word">'
		+ $("#corr_div" + num_corr).text() + '</div></td>'
		+ '<td class="change"><div width="14"> changed to </div></td>'
		+ '<td><div class="corrected_word">'
		+ $("#inputC" + num_corr).val() + '</div></td>'
		+ '<td><div class="corrected_word">'
		+$('#chosenErr'+num_corr).text()+'</div></td></tr></table>');
		$("#corr_text" + num_corr).hide();
	}
	$("#inputC" + num_corr).hide();
	$("#errTypeC" + num_corr).hide();
	$('#chosenErr'+num_corr).hide();
}