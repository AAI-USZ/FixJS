function(msg) {
    let date = new Date();
    let timeStamp = date.toLocaleTimeString() + 
                        String((date.getMilliseconds() % 1000) / 1000.).replace(/^0\./, ".");
    this._consoleService.logStringMessage(timeStamp + ": " + msg);
  }