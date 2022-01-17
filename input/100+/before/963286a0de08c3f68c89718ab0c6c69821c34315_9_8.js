function lists_set_heightTop() {
    lists_get_dimensions();
    if (!extShrinkMode) {
        $('#gui>div').css("height",pageHeight()-headerHeight()-150-40);
        $("#usr,#knd,#pct,#evt").css("height","160px");
        $("#usr_foot, #knd_foot, #pct_foot, #evt_foot").css("top",pageHeight()-30);
        $('#usrShrink').css("height","211px");
        $('#kndShrink').css("height","211px");
        // push knd/pct/evt subtables in place TOP
        var subs = pageHeight()-headerHeight()-90+25;
        $("#usr,#knd,#pct,#evt").css("top",subs);
        // push faked table heads of subtables in place
        var subs = pageHeight()-headerHeight()-90;    
        $("#usr_head,#knd_head,#pct_head,#evt_head").css("top",subs);
        $('#extShrink').css("top",subs-10);
        $('#usrShrink').css("top",subs);
        $('#kndShrink').css("top",subs);
    } else {
        $("#gui>div").css("height","105px");
        $("#usr_head,#knd_head,#pct_head,#evt_head").css("top",headerHeight()+107);
        $("#usr,#knd,#pct,#evt").css("top",headerHeight()+135);
        $("#usr,#knd,#pct,#evt").css("height",pageHeight()-headerHeight()-165);
        $('#kndShrink').css("height",pageHeight()-headerHeight()-110);
        $('#usrShrink').css("height",pageHeight()-headerHeight()-110);
        $('#extShrink').css("top",headerHeight()+97);
        $('#kndShrink').css("top",headerHeight()+105);
        $('#usrShrink').css("top",headerHeight()+105);
    }
    
    lists_set_TableWidths();
}