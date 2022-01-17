function(status, message)
  {
    const DATA = 0;
    if (status === 0 && message[DATA])
    {
      var error_messages = message[DATA];
      for (var i=0, error_message; error_message = error_messages[i]; i++)
      {
        // todo: doing this in a loop means updating the view all the time. throttling catches it, but this could probably be optimized
        this._on_console_message(error_message);
      };
    }
  }