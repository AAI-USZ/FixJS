function _cleanup($select) {
		$select.next('select.jqcombo-clone').remove();
		$select.next('input.jqcombo-input').remove();
		$select.off('.jqcombo');
	}