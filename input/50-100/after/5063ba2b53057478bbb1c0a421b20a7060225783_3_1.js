function() {
	
	if(!moduleCodeField.value){
		alert('Please enter your module code');
		return;	
	}
	if((!priceField.value)||(priceField.value.length <= 1)){
		alert('Please enter the price');
		return;
	}
	
	publishDialog.show();
}