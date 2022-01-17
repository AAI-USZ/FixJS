function stealFocus(off){
	if(off){
		$('#prompt').off('blur');
	}
	else {
		$('#prompt').off('blur').on('blur', function(){
			$('#prompt').focus();
		});
		$('#prompt').focus();
	}
}