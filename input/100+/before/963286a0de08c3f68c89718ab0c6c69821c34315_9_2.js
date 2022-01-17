function startRecord(pct_ID,evt_ID,user_ID) {
    hour=0;min=0;sec=0;
    now = Math.floor(((new Date()).getTime())/1000);
    offset = 0;
    startsec = now;
    show_stopwatch();
    value = pct_ID +"|"+ evt_ID;
    $.post("processor.php", { axAction: "startRecord", axValue: value, id: user_ID},
        function(response){
            var data = jQuery.parseJSON(response);
            currentRecording = data['id'];
            $('#buzzer').removeClass('disabled');
            ts_ext_reload();
        }
    );
}