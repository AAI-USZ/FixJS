function(step,disp,segs) {
    disp = disp || 0;
    segs = segs || 4;
    
    segment = $('.comic').height()/4;
    maxScroll = $('.comic').height()-$(window).height();
    curScroll = $(document).scrollTop();
    
    if ((curScroll >= maxScroll) && (step > 0)) {
        increment();
        $("html, body").animate({ scrollTop: 0 },10);
        return null;
    }
    if ((curScroll <= 0) && (step < 0)) {
        decrement();
        $("html, body").animate({ scrollTop: maxScroll },10);
        return null;
    }
    
    newScroll = (Math.floor((curScroll+1-disp)/segment+step)*segment+disp)
    newScroll = newScroll + "px"
    
    $("html, body").animate({ scrollTop: newScroll },100);
}