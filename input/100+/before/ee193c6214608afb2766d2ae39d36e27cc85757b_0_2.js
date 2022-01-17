function(){
        if($('body').hasClass('compact')){
           $("#osc_toolbar_switch_mode > .trigger").stop().animate({left:0},500);
           $("#osc_toolbar_switch_mode > .background").stop().animate({backgroundColor:'#f3f3f3'},500);
        } else {
           $("#osc_toolbar_switch_mode > .trigger").stop().animate({left:24},500);
           $("#osc_toolbar_switch_mode > .background").stop().animate({backgroundColor:'#00e1f2'},500);
        }
    }