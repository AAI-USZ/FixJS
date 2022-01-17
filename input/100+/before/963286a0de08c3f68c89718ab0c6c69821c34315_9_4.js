function buzzer_preselect(subject,id,name,kndID,kndName,updateRecording) {
  
    if (updateRecording == undefined) {
      updateRecording = true;
    }
    
    switch (subject) {
        case "knd":
        // TODO: build filter for project selection (by customer)
            $("#sel_knd").html("select project");
            $("#sel_knd").addClass("none");
        break;
        case "pct":
            selected_knd = kndID;
            selected_pct = id;
            $.post("processor.php", { axAction: "saveBuzzerPreselection", project:id});
            $("#sel_knd").html(kndName);
            $("#sel_pct").html(name);
            $("#sel_knd").removeClass("none");
        break;
        case "evt":
            selected_evt = id;
            $.post("processor.php", { axAction: "saveBuzzerPreselection", event:id});
            $("#sel_evt").html(name);
        break;
    }
    $('#'+subject+'>table>tbody>tr>td>a.preselect>img').attr('src','../skins/'+skin+'/grfx/preselect_off.png');
    $('#'+subject+'>table>tbody>tr>td>a.preselect#ps'+id+'>img').attr('src','../skins/'+skin+'/grfx/preselect_on.png');
    $('#'+subject+'>table>tbody>tr>td>a.preselect#ps'+id).blur();
    
    if (selected_knd && selected_pct && selected_evt) {
      $('#buzzer').removeClass('disabled');
    }

    if (currentRecording > -1 && updateRecording) {


      switch (subject) {
          case "pct":
              $.post("../extensions/ki_timesheets/processor.php", { axAction: "edit_running_project", id: currentRecording, project:id},
                function(data) {
                    ts_ext_reload();
                  }
                );
          break;
          case "evt":
            $.post("../extensions/ki_timesheets/processor.php", { axAction: "edit_running_task", id: currentRecording, task:id},
                function(data) {
                    ts_ext_reload();
                  }
              );
          break;
      }
    }
    
    $("#ticker_knd").html($("#sel_knd").html());
    $("#ticker_pct").html($("#sel_pct").html());
    $("#ticker_evt").html($("#sel_evt").html());
}