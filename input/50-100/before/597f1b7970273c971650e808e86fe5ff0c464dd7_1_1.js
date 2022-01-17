function(){
	$('#editform .item.block_text input[type=button]').each(aaPrepareTextEditorButton);
	$('#editform .item.block_text textarea').click(aaStoreCaret).select(aaStoreCaret).keyup(aaStoreCaret);
}