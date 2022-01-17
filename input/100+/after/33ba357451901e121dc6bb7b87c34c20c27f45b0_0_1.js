function(){
      version = j("#version_name").val();
      error = j(".error_message");
      unique = true;
      error.html("").hide();
      if(j(".carry-over-value.fixed_version").text() == version)
          unique = false

      if(version!="") {
        if(unique) {
          j('#ajax-indicator').show();
          j.ajax({
            type: 'post',
            url: '/treeview/create_iteration',
            data: {'version': version, 'project_id': j("#project_id").val(), 'id': j("#issue_id").val()},
            success: function() {
              j('#ajax-indicator').hide();
              j(".carry-over-options.iteration").removeClass("hidden");
              j(".carry-over-options.create_iteration").addClass("hidden");
            },
            error: function(data) {
              j('#ajax-indicator').hide();
              error.text("Error").show();
            }
          });
        }
        else
          error.html("That iteration name already exists.").show();
      } 
      else
        error.html("Please indicate iteration name.").show();
    }