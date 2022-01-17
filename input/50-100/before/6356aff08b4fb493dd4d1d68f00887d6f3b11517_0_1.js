function show_server_message () { // only show once
    if(_RM_.gw) {               // google import wait
      var msg = 'Busy importing from google reader, refresh in a few seconds';
      notify.show_msg(msg, 10000);
      _RM_.gw = 0;
    }
    if(_RM_.ge) {
      notify.show_msg('Error import from google reader : ' + _RM_.ge, 4000);
      _RM_.ge = 0;
    }
  }