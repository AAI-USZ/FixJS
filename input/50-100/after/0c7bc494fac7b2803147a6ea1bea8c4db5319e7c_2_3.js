function () {
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