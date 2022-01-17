function(index, Element) {
    if($(this).val()!=''){
      ranked.push($(this).val());
      htmloption=$("#htmlblock-"+qID+'-'+$(this).val()).html();
      var liCode = '<li class="ui-widget-content choice" id="choice_'+$(this).val()+'">' + htmloption + '</li>'
      $(liCode).appendTo('#sortable-rank-'+qID+'');
    }
  }