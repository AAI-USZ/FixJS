function() {
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
    }