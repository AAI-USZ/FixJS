function(event) {
		var recordHeader = TYPO3.jQuery(this);
		inline.expandCollapseRecord(
			recordHeader.attr('id').replace('_header', ''),
			recordHeader.attr('data-expandSingle'),
			recordHeader.attr('data-returnURL')
		);
	}