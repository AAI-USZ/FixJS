function initTrunc() {
    // Trim the add-on title and description text to fit.
    $('.htruncate').truncate({dir: 'h'});
    $('.vtruncate').truncate({dir: 'v'});
    $('#monthly .blurb > p').lineclamp(4);
    $('.ryff .desc').lineclamp(6);
    $('#promos h2:not(.multiline)').linefit();
    $(window).resize(debounce(function() {
        $('.htruncate').truncate({dir: 'h'});
        $('.vtruncate').truncate({dir: 'v'});
        $('#promos h2:not(.multiline)').linefit();
    }, 200));
}