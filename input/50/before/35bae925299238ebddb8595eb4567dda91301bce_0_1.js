function _cleanup($select) {
		$select.next('select.jqcombo-clone').remove();
		$select.next('input.jqcombo').remove();
		$select.off('.jqcombo');
	}