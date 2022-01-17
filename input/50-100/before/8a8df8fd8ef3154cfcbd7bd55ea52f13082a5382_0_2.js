function(index, Element) {
    var thisvalue=$(this).val();
    if(thisvalue!='' && jQuery.inArray(thisvalue,ranked)<0){
        var liCode = '<li class="ui-state-default choice" id="choice_'+$(this).val()+'">' + $(this).text() + '</li>'
        $(liCode).appendTo('#sortable-choice-'+qID+'');
    }
  }