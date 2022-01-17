function resetSigninCallback(event) {
  $("#progress_bar").css('width', 0);
  $("#new_tomato_form").unbind("keypress");
  TT.start(tomatoBreakDuration, TT.stateStop);
}