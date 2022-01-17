function cleanUpInsert() {
	$("#corr_text" + num_corr).after('<table><tr><td><div class="corrected_word">'
	+ $("#inputC" + num_corr).val() + '</div></td>'
	+ '<td class="change"><div width="14"> changed to </div></td>'
	+ '<td><div class="corrected_word">'
	+$('#chosenErr'+num_corr).text()+'</div></td></tr></table>');
	$("#corr_text" + num_corr).hide();
	$("#inputC" + num_corr).hide();
	$("#errTypeC" + num_corr).hide();
	$('#chosenErr'+num_corr).hide();
}