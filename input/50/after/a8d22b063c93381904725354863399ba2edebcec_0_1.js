function showReservationsDialog(testbedId) {
	var existingDialog = $("#WisebedReservationDialog-"+testbedId);
	if (existingDialog.length != 0) {existingDialog.show();}
	else {new WiseGuiReservationDialog(testbedId);}
}