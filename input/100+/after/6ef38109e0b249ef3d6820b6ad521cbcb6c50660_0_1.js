function(){
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
      }
      else if(j(this).hasClass("to")) {
        row.appendTo(origin_table.find("tbody"));
        j(this).addClass("from").removeClass("to");
        issues = j.grep(issues, function(val) { return val != row.attr("id").replace("s_", ""); });
        if(transfer_table.find("tbody").children().length==1)
          j("#no_tasks_new").show();
      }
      carried_issues.val(issues);
    }