function(){
        $.getJSON(
        $(this).attr('href'),
        function(data){
            if(data.compact_mode == false){
                $('body').removeClass('compact');
                cmode_trigger.stop().animate({left:0},500);
                cmode_bg.stop().animate({backgroundColor:'#f3f3f3'},500);
            } else {
                $('body').addClass('compact');
                cmode_trigger.stop().animate({left:24},500);
                cmode_bg.stop().animate({backgroundColor:'#00e1f2'},500);
            }
            resetLayout();
        });
        return false;
    }