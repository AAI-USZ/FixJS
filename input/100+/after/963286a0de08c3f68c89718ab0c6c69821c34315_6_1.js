function ts_ext_set_TableWidths() {
    ts_ext_get_dimensions();
    // set table widths   
    ($("#timeSheet").innerHeight()-$("#timeSheet table").outerHeight()>0)?scr=0:scr=scroller_width; // width of timeSheet table depending on scrollbar or not
    $("#timeSheet table").css("width",timeSheet_width-scr);
    $("div#timeSheet > div > table > tbody > tr > td.trackingnumber").css("width", $("#timeSheet_head > table > tbody > tr > td.trackingnumber").width());
    // stretch duration column in faked timeSheet table head
    $("#timeSheet_head > table > tbody > tr > td.time").css("width", $("div#timeSheet > div > table > tbody > tr > td.time").width());    
    // stretch customer column in faked timeSheet table head
    $("#timeSheet_head > table > tbody > tr > td.customer").css("width", $("div#timeSheet > div > table > tbody > tr > td.customer").width());    
    // stretch project column in faked timeSheet table head
    $("#timeSheet_head > table > tbody > tr > td.project").css("width", $("div#timeSheet > div > table > tbody > tr > td.project").width());
    // stretch activity column in faked timeSheet table head
    $("#timeSheet_head > table > tbody > tr > td.activity").css("width", $("div#timeSheet > div > table > tbody > tr > td.activity").width());
}