function expense_extension_set_TableWidths() {
    expense_extension_get_dimensions();
    // set table widths   
    ($("#expenses").innerHeight()-$("#expenses table").outerHeight()>0)?scr=0:scr=scroller_width; // width of expenses table depending on scrollbar or not
    $("#expenses table").css("width",expenses_width-scr);
    $("div#expenses > div > table > tbody > tr > td.refundable").css("width", $("#expenses_head > table > tbody > tr > td.refundable").width());  
    $("#expenses_head > table > tbody > tr > td.time").css("width", $("div#expenses > div > table > tbody > tr > td.time").width());
    $("#expenses_head > table > tbody > tr > td.value").css("width", $("div#expenses > div > table > tbody > tr > td.value").width());
    $("#expenses_head > table > tbody > tr > td.refundable").css("width", $("div#expenses > div > table > tbody > tr > td.refundable").width());
    // stretch customer column in faked expenses table head
    $("#expenses_head > table > tbody > tr > td.customer").css("width", $("div#expenses > div > table > tbody > tr > td.customer").width());    
    // stretch project column in faked expenses table head
    $("#expenses_head > table > tbody > tr > td.project").css("width", $("div#expenses > div > table > tbody > tr > td.project").width());
    $("#expenses_head > table > tbody > tr > td.designation").css("width", $("div#expenses > div > table > tbody > tr > td.designation").width());
}