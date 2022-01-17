function _positionInput($select, $input) {
		var offset = _positionCorrection();
		$input.css({
			top		: $select.position().top + offset.top,
			left	: $select.position().left + offset.left,
			width	: $select.width() + offset.width,
			height	: $select.height() + offset.height
		});
	}