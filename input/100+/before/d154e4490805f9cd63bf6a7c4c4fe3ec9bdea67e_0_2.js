function () {
	var values = [];
	$.each(this.valueControls, function (i, valueControl) {
		values.push(valueControl.val());
	});
	return values.join(" ");
}