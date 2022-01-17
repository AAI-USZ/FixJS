function(data){
          mainContent.html($("#network-configuration-screen").tmpl());
          var networkConfiguration=new NetworkConfiguration(data.maxTotal,data.maxTotalPerHost,data.usePooling);
          var networkConfigurationViewModel=new NetworkConfigurationViewModel(networkConfiguration);
          ko.applyBindings(networkConfigurationViewModel,mainContent.get(0));
          var validator = $("#main-content #network-proxy-edit-form").validate({
            showErrors: function(validator, errorMap, errorList) {
             customShowError(mainContent.find("#network-proxy-edit-form" ).get(0),validator,errorMap,errorMap);
            }
          });
        }