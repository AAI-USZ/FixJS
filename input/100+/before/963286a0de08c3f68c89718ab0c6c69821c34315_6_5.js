function ts_ext_recordAgain(pct,evt,id) {
    $('#zefEntry'+id+'>td>a').blur();

    if (currentRecording > -1) {
        stopRecord();
    }

    $('#zefEntry'+id+'>td>a.recordAgain>img').attr("src","../skins/"+skin+"/grfx/loading13.gif");
    hour=0;min=0;sec=0;
    now = Math.floor(((new Date()).getTime())/1000);
    offset = now;
    startsec = 0;
    show_stopwatch();
    $('#zefEntry'+id+'>td>a').removeAttr('onClick');
 
    $.post(ts_ext_path + "processor.php", { axAction: "record", axValue: 0, id: id },
        function(data) {
                eval(data);
                ts_ext_reload();
                buzzer_preselect('pct',pct,pct_name,knd,knd_name,false);
                buzzer_preselect('evt',evt,evt_name,0,0,false);
                $("#ticker_knd").html(knd_name);
                $("#ticker_pct").html(pct_name);
                $("#ticker_evt").html(evt_name);
        }
    );
}