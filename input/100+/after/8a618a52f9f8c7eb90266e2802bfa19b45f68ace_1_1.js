function() {
    $.log("adminCreateBox");
    window.redbackModel.createUser=true;
    $("#main-content").attr("data-bind",'template: {name:"redback/user-edit-tmpl",data: user}');
    var viewModel = new AdminUserViewModel();
    ko.applyBindings(viewModel,$("#main-content" ).get(0));
    $("#user-create").validate({
      rules: {
        confirmPassword: {
          equalTo: "#password"
        }
      },
      showErrors: function(validator, errorMap, errorList) {
        customShowError("#main-content #user-create",validator,errorMap,errorMap);
      }

    });
    // desactivate roles pill when adding user
    $("#edit_user_details_pills_headers").hide();
  }