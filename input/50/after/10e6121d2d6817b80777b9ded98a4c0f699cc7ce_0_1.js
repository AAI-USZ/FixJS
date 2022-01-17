function order_up(id){
    $("#modal-user").val(user_id);
    $("#modal-checkin").val(id);
    $("#myModal").modal('show');
    //post_to_url('requests/new', {id: id, user: user_id}, "get");
}