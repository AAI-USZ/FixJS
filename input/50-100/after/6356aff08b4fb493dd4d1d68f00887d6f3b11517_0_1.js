function show_server_message () { // only show once
    if(_RM_.gw) {               // google import wait
      var msg = 'Busy importing from google reader, please refresh in a few seconds';
      notify.show_msg(msg, 10000);
      _RM_.gw = 0;
    }
    if(_RM_.ge) {
      var msg2 = 'Error: ' + _RM_.ge + ' , please try again';
      notify.show_msg(msg2, 4000);
      _RM_.ge = 0;
    }
  }