function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
        getCookie(vars['domain']);
    }
    $("#edit-page").click(function () {
        linkTo('edit.html');
    });
    $("#set-page").click(function () {
        linkTo('set.html');
    });

    $('#get').click(function () {
        getCookie($('#domain').val());
    });
}