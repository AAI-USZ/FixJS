function() {
    $('#content').html();
    $('#content').append($('.noDisplay .loading').clone());
    $.ajax({
        type: 'POST',
        url: '?controller=Update&action=getStatus',
        success: successResponse
    });
}