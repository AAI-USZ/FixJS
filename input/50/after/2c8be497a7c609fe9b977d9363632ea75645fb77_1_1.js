function startCallback(event) {
  if('idle' == TT.getStatus()) {
    TT.start(tomatoDuration, currentUser ? TT.stateNewForm : TT.stateSignIn);
    event.preventDefault();
  }
}