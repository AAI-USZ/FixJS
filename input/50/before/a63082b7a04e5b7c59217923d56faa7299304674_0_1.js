function(e){
    if(e.keyCode === 13){
      $('.js-openSocket.js-'+$(this).attr('data-protocol')).trigger('click');
    }
  }