function(event){
    if($(event.target).is(':checked'))
      $('#mitigationType').removeClass('hidden');
    else if(!$('#mitigationType').hasClass('hidden'))
      $('#mitigationType').addClass('hidden');
  }