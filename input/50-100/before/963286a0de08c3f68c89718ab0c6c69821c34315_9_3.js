function show_selectors() {
    ticktack_off();
    $("#selector").css('display','block');
    $("#stopwatch").css('display','none');
    $("#stopwatch_ticker").css('display','none');
    $("#buzzer").removeClass("act");
    if (!(selected_knd && selected_pct && selected_evt)) {
      $('#buzzer').addClass('disabled');
    }
}