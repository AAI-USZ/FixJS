function add_puppet_class(item){
  var id = $(item).attr('data-class-id');
  var content = $(item).parent().clone();
  content.attr('title', 'Click to remove this class');
  content.attr('id', 'selected_puppetclass_'+ id);
  content.append("<input id='host_puppetclass_ids_' name='host[puppetclass_ids][]' type='hidden' value=" +id+ ">");

  var link = content.children().first();
  link.attr('onclick', 'remove_puppet_class(this)');
  link.removeClass('ui-icon-plus').addClass('ui-icon-minus');

  $('#selected_classes').append(content)

  $("#selected_puppetclass_"+ id).show('highlight', 5000);
  $("#puppetclass_"+ id).hide();
}