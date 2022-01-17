function callback(response) {
    var status = response.status;
    var elapsed = (Date.now() - BatchHelper.start_time) / 1000;
    $('#spawn').text('Job status: ' + status + '. Elapsed time: ' + elapsed + ' seconds.');
    switch(status) {
        case 'processing':
            setTimeout(check_job, 5000);
            break;
        case 'success':
            show_batch();
            break;
        default:
            $('#spawn').append('<div>invalid response</div>');
    }
}