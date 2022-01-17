function(i) {
		var input = $('[name=newsmaincat]').clone();
		newstext = $(this).find('.cay').val();
		$(input).val(newstext).insertBefore($(this).find('.cay'));
		$(this).find('.cay').remove();
		$(input).attr('name', 'cay').attr('class', 'cay');
		if(i > 0) $(this).find('.deloption').show();

	}