function disableRampup() {
	$('#initProcesses').val($('#processes').val());
	$('#initProcesses').attr("disabled", "disabled");
	$('#initSleepTime').attr("disabled", "disabled");
	$('#processIncrement').attr("disabled", "disabled");
	$('#processIncrementInterval').attr("disabled", "disabled");
}