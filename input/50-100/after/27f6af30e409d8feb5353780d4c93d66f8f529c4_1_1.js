function () {
	if($(this).val().length == 5) {
		$("#send_directcmd").removeAttr("disabled")
	}
	else {
		$("#send_directcmd").attr("disabled","true")
	}
}