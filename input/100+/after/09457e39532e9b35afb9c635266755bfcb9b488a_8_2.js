function findNext(cm, rev) {cm.operation(function() {
    var state = getSearchState(cm);
    var cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
    if (!cursor.find(rev)) {
      cursor = getSearchCursor(cm, state.query, rev ? {line: cm.lineCount() - 1} : {line: 0, ch: 0});
      if (!cursor.find(rev)) return;
    }
    cm.setSelection(cursor.from(), cursor.to());
    state.posFrom = cursor.from(); state.posTo = cursor.to();
  })}