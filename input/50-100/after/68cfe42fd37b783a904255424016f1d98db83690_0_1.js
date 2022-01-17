function disableRampup() {
	$('#initProcesses').val($('#processes').val());
	$('#initProcesses').attr("readonly", "readonly");
	$('#initSleepTime').attr("readonly", "readonly");
	$('#processIncrement').attr("readonly", "readonly");
	$('#processIncrementInterval').attr("readonly", "readonly");
}