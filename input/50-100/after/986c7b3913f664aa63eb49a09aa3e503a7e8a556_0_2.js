function(index, Element) {
    var thisvalue=$(this).val();
    if(thisvalue!='' && jQuery.inArray(thisvalue,ranked)<0){
        htmloption=$("#htmlblock-"+qID+'-'+$(this).val()).html();
        var liCode = '<li class="ui-state-default choice" id="choice_'+$(this).val()+'">' + htmloption + '</li>'
        $(liCode).appendTo('#sortable-choice-'+qID+'');
    }
  }