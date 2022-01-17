function remove_puppet_class(item){
  var id = $(item).attr('data-class-id');
  $('#puppetclass_' + id ).show();
  $('#selected_puppetclass_' + id).children('a').twipsy('hide');
  $('#selected_puppetclass_' + id).remove();

  return false;
}