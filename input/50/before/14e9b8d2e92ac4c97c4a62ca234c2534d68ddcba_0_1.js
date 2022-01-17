function(){
		$('#' + modalId, $context).hide();
		$('.jqmOverlay', $context).hide();
		if (onCloseCallback) onCloseCallback();
	}