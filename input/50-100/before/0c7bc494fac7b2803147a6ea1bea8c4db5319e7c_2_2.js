function(msg, msgType) {
      // Update the model if this is a new message for this type.
      var msgModel = self.messageModels[msgType];
      if (msgModel._index === undefined || msg.index > msgModel._index) {
        msgModel.set({
          _index: msg.index
        }, {
          silent: true
        });
        msgModel.set(msg.msg);
      }
    }