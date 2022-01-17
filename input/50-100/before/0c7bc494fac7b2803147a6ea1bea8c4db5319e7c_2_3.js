function () {
      $.ajax({ type : 'GET',
               url : self.url + _.keys(self.messageModels).join("+"),
               datatype: 'json',
               success: self.handleMessages,
               fail : function () { self.commStatusModel.onServerError(); }
             });
    }