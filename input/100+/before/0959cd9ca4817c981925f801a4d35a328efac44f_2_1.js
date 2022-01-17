function(event) {
    event.preventDefault();
    $('.error').removeClass('error');

    var server = $('#connect-server').val();
    var nick = $('#connect-nick').val();
    var port = $('#connect-port').val();
    var secure = $('#connect-secure').is(':checked');
    var selfSigned = $('#connect-selfSigned').is(':checked');
    var rejoin = $('#connect-rejoin').is(':checked');
    var password = $('#connect-password').val();
    
    if (!server) {
      $('#connect-server').closest('.clearfix').addClass('error');
      $('#connect-server').addClass('error');
    }
    
    if (!nick) {
      $('#connect-nick').closest('.clearfix').addClass('error');
      $('#connect-nick').addClass('error');
    }
    
    if (nick && server) {
      $('form').append(ich.load_image());
      $('#connect-button').addClass('disabled');

      var connectInfo = {
        nick: nick,
        server: server,
	port: port,
        secure: secure,
        selfSigned: selfSigned,
        rejoin: rejoin,
        password: password
      };

      irc.me = new User(connectInfo);
      irc.me.on('change:nick', irc.appView.renderUserBox);
      irc.socket.emit('connect', connectInfo);
    }
  }