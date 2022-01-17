function plotStep(step) {
      if (!step) return;

      var frames = step.frames;
      var needFlush = true;
      for (var i = 0; i < diagnosticList.length; i++) {
        var currDiagnostic = diagnosticList[i];
        if (currDiagnostic.check(frames, symbols)) {
          if (pendingDiagnostic && pendingDiagnostic != currDiagnostic) {
            var imgFile = pendingDiagnostic.image;
            var title = pendingDiagnostic.title;
            self._addDiagnosticItem(pendingDiagnosticX/widthSum, pendingDiagnosticW/widthSum, imgFile, title);
            count++;
            pendingDiagnostic = null;
          }
          if (!pendingDiagnostic) {
            pendingDiagnostic = currDiagnostic;
            pendingDiagnosticX = x;
            pendingDiagnosticW = 1;
          } else if (pendingDiagnostic && pendingDiagnostic == currDiagnostic) {
            pendingDiagnosticW++;
          }
          needFlush = false;
          break;
        }
      }
      if (needFlush && pendingDiagnostic) {
        var imgFile = pendingDiagnostic.image;
        var title = pendingDiagnostic.title;
        self._addDiagnosticItem(pendingDiagnosticX/widthSum, pendingDiagnosticW/widthSum, imgFile, title);
        count++;
        pendingDiagnostic = null;
      }
      x++;
    }