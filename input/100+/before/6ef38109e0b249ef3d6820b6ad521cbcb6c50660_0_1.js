function(){
      if(j(this).hasClass("from")) {
        var row = j(this).parents("tr")[0];
        var table = j("#transfer_table_new");
        j("#no_tasks_new").hide();
        j(row).appendTo(table.find("tbody"));
        j(this).removeClass("from").addClass("to");
      }
      else if(j(this).hasClass("to")) {
        var row = j(this).parents("tr")[0];
        var origin_table = j("#splittable_list");
        var transfer_table = j("#transfer_table_new");
        j(row).appendTo(origin_table.find("tbody"));
        j(this).addClass("from").removeClass("to");
        if(transfer_table.find("tbody").children().length==0)
          j("#no_tasks_new").show();
      }
    }