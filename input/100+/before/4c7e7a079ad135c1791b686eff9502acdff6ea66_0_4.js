function submit_order(){
    $("#myModal").modal('hide');
    getNotificationPermission();
    setTimeout(displayNotification, 5000);
    var post_data = {
	user: $("#modal-user").val(),
	check_in: $("#modal-checkin").val(),
	order: $("#modal-order").val(),
	details: $("#modal-details").val(),
	payment: $("#modal-payment").val()
    };

    //post_to_url('requests', post_data);
}