function showHideAnswer(zis)
{
    var id = $(zis).attr('id').replace(/[^\d]/g,'');
    var obj= $("#a"+id);

    if (obj.css('display') == 'none')
    {
        $(zis).html('<span class="nobr">Hide example.</span>');
        obj.css('display', 'block');
    }
    else
    {
        $(zis).html('<span class="nobr">See example.</span>');
        obj.css('display', 'none');
    }
}