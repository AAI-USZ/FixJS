function() {
      this.addListeners();  // register with the protocol
      LogBase.connect.apply(this, [this]);   // this causes the event store to be pulled into the viewport   
    }