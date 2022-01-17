function() {
    var data = read_cookie(pair_cookie_name);

    if (data == null) {
        show_popup_modal()
        return
    }

    construct_pair_ladder();

    $("#pair_ladder_table .remove_developer").click(function() {
        remove_a_dev(this);
        return false;
    });

    var resizeTimer;
    $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(construct_pair_ladder, 1000);
    });

    init_hover_animation();
}