function clear_selections(){
    $('.selectable').each(function(){select_off_selectable($(this));});
    $('#selections').children().remove();
}