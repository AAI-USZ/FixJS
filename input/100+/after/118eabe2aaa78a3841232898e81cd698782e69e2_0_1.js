function filter_puppet_classes(item){
  var term = $(item).val().trim();
  $('.puppetclass_group li.puppetclass.hide').addClass('hide-me');
  if (term.length > 0) {
    $('.puppetclass_group li.puppetclass').removeClass('filter-marker').hide();
    $('.puppetclass_group li.puppetclass:not(.hide-me, .selected-marker) span:contains('+term+')').parent('li').addClass('filter-marker').show();
  } else{
    $('.puppetclass_group li.puppetclass:not(.hide-me, .selected-marker)').addClass('filter-marker').show();
  }
  var groups = $('li.filter-marker').closest('.puppetclass_group');
  $('.puppetclass_group').hide();
  groups.show();
}