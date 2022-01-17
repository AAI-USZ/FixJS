function initialState(info) {
    var self=this;

    self.submit = checkEmail;
    if(info && info.email && info.type === "secondary" && info.known) {
      enterPasswordState.call(self, info.ready);
    }
    else {
      showHint("start");
      complete(info.ready);
    }
  }