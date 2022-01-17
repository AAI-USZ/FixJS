function getTrackChangesTable(id) {
	var text = '<table>';
	text += '<input type="hidden" name = "corr-' + id + '-num" id="corr-' + id
			+ '-num" />';
	text += '<input type="hidden" name = "corr-' + id + '-sentence" id="corr-'
			+ id + '-sentence" />';
	text += '<input type="hidden" name = "corr-' + id + '-spanst" id="corr-'
			+ id + '-spanst" />';
	text += '<input type="hidden" name = "corr-' + id + '-spanend" id="corr-'
			+ id + '-spanend" />';
	text += '<input type="hidden" name = "corr-' + id + '-oldword" id="corr-'
			+ id + '-oldword" />';
	text += '<input type="hidden" name = "corr-' + id + '-newword" id="corr-'
			+ id + '-newword" />';
	text += '<input type="hidden" name = "corr-' + id + '-mode" id="corr-'
			+ id + '-mode" />';
	text += '<input type="hidden" name = "corr-' + id + '-annotn" id="corr-' + id
			+ '-annotn" />';
	text += '</table>';
	return text;
}