function(){
	var $form = $('#editform');
	$form.find('.item.block_text input[type=button]').each(aaPrepareTextEditorButton);
	$form.find('.item.block_text textarea').click(aaStoreCaret).select(aaStoreCaret).keyup(aaStoreCaret);
	$form.find('.item.block_text textarea').each(function() {
		if(this.addEventListener)
			this.addEventListener('keydown', tabKeyHandler, false);
		else if(this.attachEvent)
			this.attachEvent('onkeydown', tabKeyHandler);
	})
}