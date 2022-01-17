function show_stopwatch() {
    $("#selector").css('display','none');
    $("#stopwatch").css('display','block');
    $("#stopwatch_ticker").css('display','block');
    $("#buzzer").addClass("act");
    $("#ticker_customer").html($("#selected_customer").html());
    $("#ticker_project").html($("#selected_project").html());
    $("#ticker_activity").html($("#selected_activity").html());
    $("ul#ticker").newsticker();
    ticktac();
}