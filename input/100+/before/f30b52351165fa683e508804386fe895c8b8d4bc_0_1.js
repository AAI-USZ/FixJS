function ( mtable, commStatusModel ) {
    var self = this;
    this.mtable = mtable;
    this.commStatusModel = commStatusModel;

    this.parseMsgResults = function (data) {
      console.log({"mavlink api data": data });
      self.commStatusModel.onServerSuccess();
      /* For each messagetype in data, */
      _.each(data, function( msg, mtype ) {
        /* Find the handler for that messagetype in mtable */
        if (mtype in self.mtable) {
          /* and dispatch the message to the handler. */
          self.mtable[mtype](msg);
        }

        if (mtype == "HEARTBEAT") {
          self.commStatusModel.onHeartbeat();
        }
      });
    };

    this.update = function () {
      $.ajax({ type : 'GET',
               url : "mavlink/" + _.keys(self.mtable).join("+"),
               datatype: 'json',
               success: self.parseMsgResults,
               fail : function () { self.commStatusModel.onServerError(); }
             });
    };
  }