function ts_ext_set_TableWidths() {
    ts_ext_get_dimensions();
    // set table widths   
    ($("#zef").innerHeight()-$("#zef table").outerHeight()>0)?scr=0:scr=scroller_width; // width of zef table depending on scrollbar or not
    $("#zef table").css("width",zef_w-scr);
    $("div#zef > div > table > tbody > tr > td.trackingnumber").css("width", $("#zef_head > table > tbody > tr > td.trackingnumber").width());
    // stretch duration column in faked zef table head
    $("#zef_head > table > tbody > tr > td.time").css("width", $("div#zef > div > table > tbody > tr > td.time").width());    
    // stretch customer column in faked zef table head
    $("#zef_head > table > tbody > tr > td.knd").css("width", $("div#zef > div > table > tbody > tr > td.knd").width());    
    // stretch project column in faked zef table head
    $("#zef_head > table > tbody > tr > td.pct").css("width", $("div#zef > div > table > tbody > tr > td.pct").width());
    // stretch event column in faked zef table head
    $("#zef_head > table > tbody > tr > td.evt").css("width", $("div#zef > div > table > tbody > tr > td.evt").width());
}