function(step,panes,disp) {
    ch = $('.comic').height()
    wh = $(window).height()
    
    panes = panes || 4;
    disp = disp || 0;
    
    step = step * wh / (ch / panes)
    
    segment = ch/4;
    maxScroll = ch-wh;
    curScroll = $(document).scrollTop();
    
    if ((curScroll >= maxScroll) && (step > 0)) {
        increment();
        $("html, body").animate({ scrollTop: 0 },40);
        return null;
    }
    if ((curScroll <= 0) && (step < 0)) {
        decrement();
        $("html, body").scrollTop(maxScroll);
        $("html, body").animate({ scrollTop: maxScroll },40);
        return null;
    }
    
    newScroll = (Math.floor((curScroll+1-disp)/segment+step)*segment+disp)
    newScroll = newScroll + "px"
    
    $("html, body").animate({ scrollTop: newScroll },100);
}