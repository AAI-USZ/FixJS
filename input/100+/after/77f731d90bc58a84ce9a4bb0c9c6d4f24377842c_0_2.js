function() {
    j(".transfer_button").live("click", function(){
      var row = j(j(this).parents("tr")[0]),
          origin_table = j("#splittable_list"),
          transfer_table = j("#transfer_table_new"),
          carried_issues = j("#carry_over_to_issues"),
          issues = (carried_issues.val() != "") ? carried_issues.val().split(",") : [];
      if(j(this).hasClass("from")) {
        j("#no_tasks_new").hide();
        row.appendTo(transfer_table.find("tbody"));
        j(this).removeClass("from").addClass("to");
        issues.push(row.attr("id").replace("s_", ""));
        j("#new_carry_over_form_submit").removeAttr("disabled")
      }
      else if(j(this).hasClass("to")) {
        row.appendTo(origin_table.find("tbody"));
        j(this).addClass("from").removeClass("to");
        issues = j.grep(issues, function(val) { return val != row.attr("id").replace("s_", ""); });
        if(transfer_table.find("tbody").children().length==1) {
          j("#no_tasks_new").show();
          j("#new_carry_over_form_submit").attr("disabled", "disabled")
        }
      }
      carried_issues.val(issues);
    });

    j("#new_iteration").live("click", function(){
      j("#version_name").val("")
      j(".error_message").text("").hide();
      j(".carry-over-options.iteration").addClass("hidden");
      j(".carry-over-options.create_iteration").removeClass("hidden");
    });
    
    j("#create_iteration").live("click", function(){
      version = j("#version_name").val();
      error = j(".error_message");
      unique = true;
      error.html("").hide();
      j("#carry_over_to_fixed_version_id").children().each(function(index, val){
        if(val.text.toLowerCase() == version.toLowerCase())
          unique = false
      });
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
    });

    j("#cancel_iteration").live("click", function(){
      j(".carry-over-options.iteration").removeClass("hidden");
      j(".carry-over-options.create_iteration").addClass("hidden");
    });
  }