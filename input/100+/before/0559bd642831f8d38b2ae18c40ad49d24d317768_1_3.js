function bind_events_detailbox() {
    $('.clickableitem,.dataview,.dataupdown,.orderedit').mouseover(function(e){highlight_editable_item(e);});
    $('.clickableitem,.dataview,.dataupdown,.orderedit').mouseout(function(e){un_highlight_editable_item(e);});

    $('div.clickablelabel,div.clickablebutton').click(function(e){show_editable_item(e);});
    $('div.memoeditbutton').click(function(e){show_editable_item(e);});

    $('img.itemadd').click(function(e){show_add_item(e);});
    $('input.togglebutton').click(function(e){e.preventDefault(); $(e.target).closest('form').submit(); return false;});

    $('form.field_edit_form').submit(function(e){commit_field_change(e);});
    $('form.toggle_form').submit(function(e){commit_toggle_form(e);});

    if (('bind_events_detailbox_addons' in window) && bind_events_detailbox_addons.length > 0) {
        $.each(bind_events_detailbox_addons, function(){ this(); });
    }
}