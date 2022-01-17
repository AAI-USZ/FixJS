function submit_order(){
    $("#myModal").modal('hide');
    getNotificationPermission();
    setTimeout(displayNotification, 5000);
    var post_data = {
      request: {
        order: $("#order").val(),
        details: '',
        payment: $("#payment").val(),
        user: $("#modal-user").val(),
        check_in: $("#modal-checkin").val(),
        address: $('#modal-address').val()
      }
    };

    $.post('/requests.json', post_data);
//    post_to_url('requests', post_data);

}