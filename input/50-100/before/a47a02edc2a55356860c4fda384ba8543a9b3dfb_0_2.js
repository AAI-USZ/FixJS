function(){
   var protocol = $(this).parent().attr('data-protocol')
      , port = $(this).parent().find('a').html()
      ;
    socket.emit('kill' + protocol, port);
    tabs.closeTab(port, this);
	}