function () {
    var container = $(this).closest('.cat_discipline_addresses');
    var sector_id = parseInt($(this).attr('data-sector-id'));
    var discipline_id = parseInt($(this).attr('data-discipline-id'));
    container.empty();
    $('<p><a class="catalog_show_addresses" data-sector-id="'+sector_id+'" data-discipline-id="'+discipline_id+'" href="/catalog/'+sector_id+'/'+discipline_id+'">Показать интернет-адреса</a></p>').appendTo(container);
    return false;
  }