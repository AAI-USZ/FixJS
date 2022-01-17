function(){
  
  window.MavlinkMessage = Backbone.Model.extend({});


  // FIXME: I'm just extending Model to get the
  // constructor/initialize() behavior and the Events mixin.  Should
  // define an Object class that calls a constructor.
  window.MavlinkAPI = Backbone.Model.extend({
    initialize: function() {
      this.url = this.get('url');
      // Table of message models, keyed by message type.
      this.messageModels = {};
    },

    subscribe: function(msgType, handlerFunction, context) {
      if (!this.messageModels[msgType]) {
        this.messageModels[msgType] = new MavlinkMessage({
          _type: msgType,
          _index: -1});
      }
      var model = this.messageModels[msgType];
      model.bind('change', handlerFunction, context);
      return model;
    },

    handleMessages: function(msgEnvelopes) {
      _.each(msgEnvelopes, this.handleMessage, this);
    },

    handleMessage: function(msg, msgType) {
      this.trigger('gotServerResponse');
      // Update the model if this is a new message for this type.
      var msgModel = this.messageModels[msgType];
      if (msgModel._index === undefined || msg.index > msgModel._index) {
        msgModel.set({
          _index: msg.index
        }, {
          silent: true
        });
        msgModel.set(msg.msg);
      }
    },

    update: function () {
      $.ajax({ context: this,
               type : 'GET',
               url : this.url + _.keys(this.messageModels).join("+"),
               datatype: 'json',
               success: this.handleMessages,
               fail : function () {
                 this.trigger('gotServerError');
               }
             });
    }
  });
}