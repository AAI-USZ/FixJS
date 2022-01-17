function startCallback(event) {
  if('idle' == TT.getStatus()) {
    TT.start(tomatoDuration, TT.stateNewForm);
    event.preventDefault();
  }
}