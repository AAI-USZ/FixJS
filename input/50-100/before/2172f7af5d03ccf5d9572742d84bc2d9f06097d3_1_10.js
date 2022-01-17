function(evt) {
        var target = $(evt.target);
        target.removeClass('badTarget');
        dispatcher.post('hideComment');
        if (highlight) {
          svg.remove(highlight);
          highlight = undefined;
        }
        if (highlightSpans) {
          highlightArcs.removeClass('highlight');
          highlightSpans.removeClass('highlight');
          highlightSpans = undefined;
        }
        forceRedraw();
      }