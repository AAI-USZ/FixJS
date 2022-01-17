function ts_ext_recordAgain(project,activity,id) {
    $('#timeSheetEntry'+id+'>td>a').blur();

    if (currentRecording > -1) {
        stopRecord();
    }

    $('#timeSheetEntry'+id+'>td>a.recordAgain>img').attr("src","../skins/"+skin+"/grfx/loading13.gif");
    hour=0;min=0;sec=0;
    now = Math.floor(((new Date()).getTime())/1000);
    offset = now;
    startsec = 0;
    show_stopwatch();
    $('#timeSheetEntry'+id+'>td>a').removeAttr('onClick');
 
    $.post(ts_ext_path + "processor.php", { axAction: "record", axValue: 0, id: id },
        function(data) {
                eval(data);
                ts_ext_reload();
                buzzer_preselect('project',project,projectName,customer,customerName,false);
                buzzer_preselect('activity',activity,activityName,0,0,false);
                $("#ticker_customer").html(customerName);
                $("#ticker_project").html(projectName);
                $("#ticker_activity").html(activityName);
        }
    );
}