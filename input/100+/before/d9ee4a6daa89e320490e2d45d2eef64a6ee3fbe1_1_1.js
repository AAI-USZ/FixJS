function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
        getCookie(vars['domain']);
    }

    $("#get-page").click(function () {
        linkTo('get.html');
    });
    $("#set-page").click(function () {
        linkTo('set.html');
    });
    $('#get').click(function () {
        $("#table").text('');
        $("#cookie").remove();
        getCookie($('#domain').val());
    });
}