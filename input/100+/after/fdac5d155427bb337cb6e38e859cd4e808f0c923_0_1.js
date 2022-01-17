function add_puppet_class(item){
  var id = $(item).attr('data-class-id');
  var content = $(item).parent().clone();
  content.attr('id', 'selected_puppetclass_'+ id);
  content.append("<input id='host_puppetclass_ids_' name='host[puppetclass_ids][]' type='hidden' value=" +id+ ">");
  content.children('span').twipsy();

  var link = content.children('a');
  link.attr('onclick', 'remove_puppet_class(this)');
  link.attr('data-original-title', 'Click to undo adding this class');
  link.removeClass('ui-icon-plus').addClass('ui-icon-minus').twipsy();

  $('#selected_classes').append(content)

  $("#selected_puppetclass_"+ id).show('highlight', 5000);
  $("#puppetclass_"+ id).hide();
}