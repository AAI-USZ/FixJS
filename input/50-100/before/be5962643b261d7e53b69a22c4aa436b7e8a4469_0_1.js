function callback(response) {
    var status = response.status;
    $('#spawn').append('<div>Job status: ' + status + '</div>');
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