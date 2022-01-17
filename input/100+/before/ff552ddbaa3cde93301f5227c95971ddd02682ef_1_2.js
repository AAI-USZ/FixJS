function(data) {
      handshakes += (('' + data).match(/verify return:1/g) || []).length;
      if (handshakes === 2) spam();
    }