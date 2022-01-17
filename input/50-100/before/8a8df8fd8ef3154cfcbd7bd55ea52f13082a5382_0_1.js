function(index, Element) {
    if($(this).val()!=''){
      ranked.push($(this).val());
      var liCode = '<li class="ui-state-default choice" id="choice_'+$(this).val()+'">' + $(this).text() + '</li>'
      $(liCode).appendTo('#sortable-rank-'+qID+'');
    }
  }