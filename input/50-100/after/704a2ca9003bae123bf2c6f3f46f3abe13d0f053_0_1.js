function() {
      var _this = this;
      NetworkClient.__super__.stage.apply(this, arguments);
      return this.playerUpdateInterval = setInterval(function() {
        var data;
        if (!now.sendPlayerUpdate) {
          return;
        }
        data = {};
        _this.fire('willSendPlayerUpdate', data);
        if (!data.cancel) {
          return now.sendPlayerUpdate(data);
        }
      }, Milk.NetworkClient.UPDATE_INTERVAL);
    }