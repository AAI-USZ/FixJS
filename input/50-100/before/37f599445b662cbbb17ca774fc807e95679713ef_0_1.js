function(event){
    if($(event.target).val() == 'mitigation')
      $('#mitigationType').removeClass('hidden');
    else
      $('#mitigationType').addClass('hidden');
  }