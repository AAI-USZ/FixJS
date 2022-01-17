function(){
      if (!$("#main-content #network-proxy-edit-form").valid()){
        return;
      }
      clearUserMessages();
      $.ajax("restServices/archivaServices/archivaAdministrationService/setNetworkConfiguration", {
        type: "POST",
        contentType: 'application/json',
        data: ko.toJSON(self.networkConfiguration),
        dataType: 'json',
        success: function(data){
          displaySuccessMessage( $.i18n.prop("network-configuration.updated"));
        }
      });
    }