function(){
		$('#' + modalId, $context).hide();
		$('.jqmOverlay', $context).remove();
		if (onCloseCallback) onCloseCallback();
	}