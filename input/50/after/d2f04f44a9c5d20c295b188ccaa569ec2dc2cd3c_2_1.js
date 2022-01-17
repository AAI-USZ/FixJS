function(debuggerProtocol) {
      LogBase.connect.apply(this, [this]);     
      this.addListeners();  // register with the protocol
      this.enable(function onEnable(){
          console.log("Console.enable");
      })
    }