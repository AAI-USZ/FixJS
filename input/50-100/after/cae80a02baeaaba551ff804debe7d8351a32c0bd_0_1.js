function() {
    loading();
    $.ajax({
        type: 'POST',
        url: '?controller=Update&action=getStatus',
        success: successResponse
    });
}