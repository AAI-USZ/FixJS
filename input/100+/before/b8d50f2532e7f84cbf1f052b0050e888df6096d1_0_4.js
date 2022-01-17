function loadTheme(id) {
    $('#theme').attr('href', './css/theme_' + id + '.css');
    $.cookie('theme', id, {expires: 7});
}