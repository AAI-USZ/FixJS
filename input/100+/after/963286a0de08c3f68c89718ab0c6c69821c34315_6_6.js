function ts_ext_stopRecord(id) {
    ts_ext_recordAgain=-1;
    ticktack_off();
    show_selectors();
    if (id) {
        $('#timeSheetEntry'+id+'>td').css( "background-color", "#F00" );
        $('#timeSheetEntry'+id+'>td>a.stop>img').attr("src","../skins/"+skin+"/grfx/loading13_red.gif");     
        $('#timeSheetEntry'+id+'>td>a').blur();
        $('#timeSheetEntry'+id+'>td>a').removeAttr('onClick');
        $('#timeSheetEntry'+id+'>td').css( "color", "#FFF" );
    }
    $.post(ts_ext_path + "processor.php", { axAction: "stop", axValue: 0, id: id },
        function(data) {
            if (data == 1) {
                ts_ext_reload();
            } else {
                alert("~~an error occured!~~")
            }
        }
    );
}