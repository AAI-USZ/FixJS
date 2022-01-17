function(msgType, handlerFunction, context) {
      if (!self.messageModels[msgType]) {
        self.messageModels[msgType] = new MavlinkMessage({
          _type: msgType,
          _index: -1});
      }
      var model = self.messageModels[msgType];
      model.bind('change', handlerFunction, context);
      return model;
    }