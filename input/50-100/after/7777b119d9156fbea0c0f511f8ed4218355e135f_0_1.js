function(){
    $('.clickable_top').each(function(i, elem){
        var elem_id = $(elem).parents('div').first().attr('id');
        var arrow_id = elem_id + '_arrow';
        $('#' + arrow_id).addClass('arrow');
        $(elem).click(makeTransition('#' + elem_id, '#' + arrow_id));
    });
}