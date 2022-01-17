function filter_puppet_classes(item){
  var term = $(item).val().trim();
  $('li.puppetclass.hide').addClass('hide-me');
  if (term.length > 0) {
    $('li.puppetclass').removeClass('filter-marker').hide();
    $('li.puppetclass:not(.hide-me, .selected-marker) span:contains('+term+')').parent('li').addClass('filter-marker').show();
  } else{
    $('li.puppetclass:not(.hide-me, .selected-marker)').addClass('filter-marker').show();
  }
  var groups = $('li.filter-marker').closest('.puppetclass_group');
  $('.puppetclass_group').hide();
  groups.show();
}