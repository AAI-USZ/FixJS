function formatPrice(field){
	var pattern = new RegExp(/[^0-9\-\.]+/g);
	var price = field.value.replace(pattern,'');
	field.value = $().number_format(price, { numberOfDecimals:2,
											 decimalSeparator: numberSeparators.decimal,
											 thousandSeparator: numberSeparators.thousand});
}