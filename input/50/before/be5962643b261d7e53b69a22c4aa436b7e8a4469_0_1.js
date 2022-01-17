function show_batch() {
    var batch_id = $('#spawn').attr('data-id');
    $('#spawn').append('<div>hey i am done</div>');
    $.getScript('batches/' + batch_id + '.js');
}