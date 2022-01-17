function (window_title, text, translation, origin) {
        jQuery("#text").val(text ? text : '');
        jQuery("#originaltext").val(text ? text : '');
        jQuery("#translation").val(translation ? translation : '');
        jQuery("#origin").val(origin ? origin : '');
        jQuery("#edit_window").dialog({
            'title': window_title,
            'show': "fade",
            'hide': "fade",
            'width': "80%",
            'modal': true
        });
        STUDIP.i18n.check();
    }