function(rangeFinder, markText) {
  var folded = [];
  if (markText == null) markText = '<div style="position: absolute; left: 2px; color:#600">&#x25bc;</div>%N%';

  function isFolded(cm, n) {
    for (var i = 0; i < folded.length; ++i) {
      var start = cm.lineInfo(folded[i].start);
      if (!start) folded.splice(i--, 1);
      else if (start.line == n) return {pos: i, region: folded[i]};
    }
  }

  function expand(cm, region) {
    cm.clearMarker(region.start);
    for (var i = 0; i < region.hidden.length; ++i)
      cm.showLine(region.hidden[i]);
  }

  return function(cm, line) {
    cm.operation(function() {
      var known = isFolded(cm, line);
      if (known) {
        folded.splice(known.pos, 1);
        expand(cm, known.region);
      } else {
        var end = rangeFinder(cm, line);
        if (end == null) return;
        var hidden = [];
        for (var i = line + 1; i < end; ++i) {
          var handle = cm.hideLine(i);
          if (handle) hidden.push(handle);
        }
        var first = cm.setMarker(line, markText);
        var region = {start: first, hidden: hidden};
        cm.onDeleteLine(first, function() { expand(cm, region); });
        folded.push(region);
      }
    });
  };
}