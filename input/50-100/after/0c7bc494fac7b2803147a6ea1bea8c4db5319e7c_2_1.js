function(msgType, handlerFunction, context) {
      if (!this.messageModels[msgType]) {
        this.messageModels[msgType] = new MavlinkMessage({
          _type: msgType,
          _index: -1});
      }
      var model = this.messageModels[msgType];
      model.bind('change', handlerFunction, context);
      return model;
    }