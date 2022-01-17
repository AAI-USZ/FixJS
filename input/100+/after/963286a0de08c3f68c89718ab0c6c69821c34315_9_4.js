function buzzer_preselect(subject,id,name,customerID,customerName,updateRecording) {
  
    if (updateRecording == undefined) {
      updateRecording = true;
    }
    
    switch (subject) {
        case "customer":
        // TODO: build filter for project selection (by customer)
            $("#selected_customer").html("select project");
            $("#selected_customer").addClass("none");
        break;
        case "project":
            selected_customer = customerID;
            selected_project = id;
            $.post("processor.php", { axAction: "saveBuzzerPreselection", project:id});
            $("#selected_customer").html(customerName);
            $("#selected_project").html(name);
            $("#selected_customer").removeClass("none");
        break;
        case "activity":
            selected_activity = id;
            $.post("processor.php", { axAction: "saveBuzzerPreselection", activity:id});
            $("#selected_activity").html(name);
        break;
    }
    $('#'+subject+'>table>tbody>tr>td>a.preselect>img').attr('src','../skins/'+skin+'/grfx/preselect_off.png');
    $('#'+subject+'>table>tbody>tr>td>a.preselect#ps'+id+'>img').attr('src','../skins/'+skin+'/grfx/preselect_on.png');
    $('#'+subject+'>table>tbody>tr>td>a.preselect#ps'+id).blur();
    
    if (selected_customer && selected_project && selected_activity) {
      $('#buzzer').removeClass('disabled');
    }

    if (currentRecording > -1 && updateRecording) {


      switch (subject) {
          case "project":
              $.post("../extensions/ki_timesheets/processor.php", { axAction: "edit_running_project", id: currentRecording, project:id},
                function(data) {
                    ts_ext_reload();
                  }
                );
          break;
          case "activity":
            $.post("../extensions/ki_timesheets/processor.php", { axAction: "edit_running_task", id: currentRecording, task:id},
                function(data) {
                    ts_ext_reload();
                  }
              );
          break;
      }
    }
    
    $("#ticker_customer").html($("#selected_customer").html());
    $("#ticker_project").html($("#selected_project").html());
    $("#ticker_activity").html($("#selected_activity").html());
}