function(i, frame, previousFrame, initialize) {
        if (!frame) {
          // repeat of the previous frame
          instance.$setDisplayList(i + 1, previousDisplayList);
          return;
        }
        var displayList = [];
        for (var depth in frame) {
          if (previousFrame && previousFrame[depth] === frame[depth]) {
            displayList[depth] = previousDisplayList[depth];
            continue;
          }
          var creator = frame[depth];
          if (typeof creator === 'function')
            displayList[depth] = creator(this, objectCache, as2Context);
          else
            displayList[depth] = creator;
        }
        initialize(this);
        instance.$setDisplayList(i + 1, displayList);
        previousDisplayList = displayList;
      }