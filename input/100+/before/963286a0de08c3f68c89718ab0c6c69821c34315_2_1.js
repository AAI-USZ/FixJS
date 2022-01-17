function exp_ext_set_TableWidths() {
    exp_ext_get_dimensions();
    // set table widths   
    ($("#exp").innerHeight()-$("#exp table").outerHeight()>0)?scr=0:scr=scroller_width; // width of exp table depending on scrollbar or not
    $("#exp table").css("width",exp_w-scr);
    $("div#exp > div > table > tbody > tr > td.refundable").css("width", $("#exp_head > table > tbody > tr > td.refundable").width());  
    $("#exp_head > table > tbody > tr > td.time").css("width", $("div#exp > div > table > tbody > tr > td.time").width());
    $("#exp_head > table > tbody > tr > td.value").css("width", $("div#exp > div > table > tbody > tr > td.value").width());
    $("#exp_head > table > tbody > tr > td.refundable").css("width", $("div#exp > div > table > tbody > tr > td.refundable").width());
    // stretch customer column in faked exp table head
    $("#exp_head > table > tbody > tr > td.knd").css("width", $("div#exp > div > table > tbody > tr > td.knd").width());    
    // stretch project column in faked exp table head
    $("#exp_head > table > tbody > tr > td.pct").css("width", $("div#exp > div > table > tbody > tr > td.pct").width());
    $("#exp_head > table > tbody > tr > td.designation").css("width", $("div#exp > div > table > tbody > tr > td.designation").width());
}