function() {
	this.listItem.series.programId = SpinningWheel.getSelectedValues().keys[0];
	$("#moveTo").val(SpinningWheel.getSelectedValues().values[0]);
	this.swtoucheventproxy = null;
}