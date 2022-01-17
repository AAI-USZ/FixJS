function (protocol, port) {
        if($('.js-'+protocol+'-multifile').attr('checked')) {
          socket.emit('writeFile', protocol, port);
        }
      }