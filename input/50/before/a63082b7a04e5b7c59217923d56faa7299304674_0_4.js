function (protocol) {
        if($('.js-'+protocol+'-multifile').attr('checked')) {
          socket.emit('writeFile', protocol);
        }
      }