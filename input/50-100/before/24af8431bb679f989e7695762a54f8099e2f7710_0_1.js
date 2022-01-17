function serverResponseError() {
    var btns = {};
    btns[PMA_messages['strReloadPage']] = function() {
        window.location.reload();
    };
    $('#emptyDialog').dialog('option', 'title', PMA_messages['strRefreshFailed']);
    $('#emptyDialog').html(
        PMA_getImage('s_attention.png') +
        PMA_messages['strInvalidResponseExplanation']
    );
    $('#emptyDialog').dialog({ buttons: btns });
}