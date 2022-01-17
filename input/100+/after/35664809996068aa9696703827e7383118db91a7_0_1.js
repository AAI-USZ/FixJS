function updateProgressBarValue(){
    var showPercentDone = 0;
    if (currentShow.length > 0){
        showPercentDone = (estimatedSchedulePosixTime - currentShow[0].showStartPosixTime)/currentShow[0].showLengthMs*100;
        if (showPercentDone < 0 || showPercentDone > 100){
            showPercentDone = 0;
            currentShow = new Array();
            currentSong = null;
        }
    }
    $('#progress-show').attr("style", "width:"+showPercentDone+"%");

    var songPercentDone = 0;
    var scheduled_play_div = $("#scheduled_play_div");
    var scheduled_play_line_to_switch = scheduled_play_div.parent().find(".line-to-switch");
    
    if (currentSong !== null){	
        var songElapsedTime = 0;
        songPercentDone = (estimatedSchedulePosixTime - currentSong.songStartPosixTime)/currentSong.songLengthMs*100;
        songElapsedTime = estimatedSchedulePosixTime - currentSong.songStartPosixTime;
        if (songPercentDone < 0 || songPercentDone > 100){
            songPercentDone = 0;        
            currentSong = null;
        } else {
            if ((currentSong.media_item_played == true && currentShow.length > 0) || (songElapsedTime < 5000 && currentShow[0].record != 1)) {
                scheduled_play_line_to_switch.attr("class", "line-to-switch on");
                scheduled_play_div.addClass("ready");
                scheduled_play_source = true;
            }
            else{
                scheduled_play_source = false;
                scheduled_play_line_to_switch.attr("class", "line-to-switch off");
                scheduled_play_div.removeClass("ready");
            }
            $('#progress-show').attr("class", "progress-show");
        }
    } else {
        scheduled_play_source = false;
        scheduled_play_line_to_switch.attr("class", "line-to-switch off");
        scheduled_play_div.removeClass("ready");
        $('#progress-show').attr("class", "progress-show-error");
        
    }
    $('#progress-bar').attr("style", "width:"+songPercentDone+"%");

    //calculate how much time left to next song if there is any
    if (nextSong !== null && nextSongPrepare){
        var diff = nextSong.songStartPosixTime - estimatedSchedulePosixTime;
        if (diff < serverUpdateInterval){
            
            //sometimes the diff is negative (-100ms for example). Still looking
            //into why this could sometimes happen.
            if (diff < 0)
                diff=0;
                
            nextSongPrepare = false;
            setTimeout(newSongStart, diff);
        }
    }
    
    //calculate how much time left to next show if there is any
    if (nextShow.length > 0 && nextShowPrepare){
        var diff = nextShow[0].showStartPosixTime - estimatedSchedulePosixTime;
        if (diff < serverUpdateInterval){
            if (diff < 0)
                diff=0;
                
            nextShowPrepare = false;
            setTimeout(nextShowStart, diff);
        }
    }
}