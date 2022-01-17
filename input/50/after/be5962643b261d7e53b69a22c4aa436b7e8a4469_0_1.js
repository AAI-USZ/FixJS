function show_batch() {
    var batch_id = $('#spawn').attr('data-id');
    $.getScript('batches/' + batch_id + '.js');
}