function getDialog(content) {
	var modal = $('<div class="dialog-modal"></div>');
	var div_content = $('<div class="dialog-modal-content"></div>')
		.append(content)
		.append($('<a class="dialog-modal-btn-close button"></a>')
			.text('close')
			.click(function() {
				modal.hide();
			})
		)
		.appendTo(modal)
	;
	return modal;
}