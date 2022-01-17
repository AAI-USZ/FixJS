function order_up(id){
    c = JSON.parse($('#check-in-'+id).find('#json').html());
    $('#order').val('');
    $('#details').val('');
    $('#payment').val(c.fee);
    $('#modal-user').val(c.user_id);
    $('#modal-address').val(c.address_id);
    $("#modal-checkin").val(id);
    $('#address-name').html('<option>'+c.address_name+'</option>');
    $('#deliverer').html(c.user);
    $("#myModal").modal('show');
}