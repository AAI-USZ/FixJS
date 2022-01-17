function(){
    screenChange();
    var mainContent=$("#main-content");
    mainContent.html(mediumSpinnerImg());
    $.ajax("restServices/archivaServices/archivaAdministrationService/getUiConfiguration", {
        type: "GET",
        dataType: 'json',
        success: function(data){
          mainContent.html($("#ui-configuration-screen").tmpl());
          var uiConfiguration=new UiConfiguration(data.showFindArtifacts,data.appletFindEnabled,data.disableEasterEggs,data.applicationUrl);
          var uiConfigurationViewModel=new UiConfigurationViewModel(uiConfiguration);
          ko.applyBindings(uiConfigurationViewModel,mainContent.get(0));
          /*var validator = mainContent.find("#network-configuration-edit-form").validate({
            showErrors: function(validator, errorMap, errorList) {
             customShowError(mainContent.find("#network-configuration-edit-form" ).get(0),validator,errorMap,errorMap);
            }
          });*/
        }
    });
  }