function submit_correction() {
    var content = $('#corrected_text').val()
    payload = {
        'content' : content, 
        'cp_id' : commprod_data['cp_id'],
        'user' : commprod_data['username']
    };

    $.post('/commprod/correction', payload, function(res){
        $('#correction_container').append(res['correction'][0]);
        $('#submit_success').slideUp();
    });
    $('#correction_modal').modal('hide');
    $('#submit_success').slideDown();
}