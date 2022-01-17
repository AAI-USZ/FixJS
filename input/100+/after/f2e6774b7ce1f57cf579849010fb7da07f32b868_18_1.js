function back() {
    if (stack.length < 1)
      return;
    var current = document.getElementById(_currentView);
    var nextView = stack.pop();
    var next = document.getElementById(nextView.view);
    var from = transitions[nextView.transition].from;
    var to = transitions[nextView.transition].to;
    if (from == 'none' || to == 'none') {
      setAppView(current, next);
    } else {
      var reverted = revertTransition(nextView.transition);
      setCacheView(current, next, reverted);
    }
    _currentView = nextView.view;
  }