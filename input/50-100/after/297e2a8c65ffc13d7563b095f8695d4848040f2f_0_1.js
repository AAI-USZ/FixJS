function tabTrigger(){
        var imgs = $(".slide-main .yui3-tabs-panel");
        var selected = $(".slide-main .yui3-tabs-panel-selected");
        var index = imgs.index(selected);
        if(++index >= imgs.length)
        {
            index = 0;
        }
        triggerImg(index);
    }