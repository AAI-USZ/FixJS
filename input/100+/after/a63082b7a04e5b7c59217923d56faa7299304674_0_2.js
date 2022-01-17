function(){
    if($(this).attr('data-protocol') === 'http'){
      var port = $(this).closest('.js-ui-tab-view').attr('data-name');
      $('.js-log.activeLog.js-'+port).trigger('click');
      socket.emit('kill' + $(this).attr('data-protocol'), port);
    }
    else{
      $('.js-log.activeLog.js-'+$(this).attr('data-protocol')).trigger('click');
      socket.emit('kill' + $(this).attr('data-protocol'));
    }
  }