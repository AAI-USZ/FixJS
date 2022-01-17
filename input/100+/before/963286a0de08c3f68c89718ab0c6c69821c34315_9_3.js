function show_stopwatch() {
    $("#selector").css('display','none');
    $("#stopwatch").css('display','block');
    $("#stopwatch_ticker").css('display','block');
    $("#buzzer").addClass("act");
    $("#ticker_knd").html($("#sel_knd").html());
    $("#ticker_pct").html($("#sel_pct").html());
    $("#ticker_evt").html($("#sel_evt").html());
    $("ul#ticker").newsticker();
    ticktac();
}