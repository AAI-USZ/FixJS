function remove_puppet_class(item){
  var id = $(item).attr('data-class-id');
  $('#puppetclass_' + id).removeClass('selected-marker').show();
  $('#puppetclass_' + id).closest('.puppetclass_group').show();
  $('#selected_puppetclass_' + id).children('a').tooltip('hide');
  $('#selected_puppetclass_' + id).remove();
  $('#selected_puppetclass_' + id+' > [data-tag="edit"]').removeClass('error').removeClass('warning');
  $('#puppetclass_' + id + '_params_loading').remove();
  $('[id^="puppetclass_' + id + '_params\\["]').remove();

  return false;
}