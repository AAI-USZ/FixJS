function set_suggests(hvlist){
  $('div.hidden.suggested_items').empty();
  $.each(hvlist, function(i,hv){
    $('div.hidden.suggested_items').append(hv);
  });
}