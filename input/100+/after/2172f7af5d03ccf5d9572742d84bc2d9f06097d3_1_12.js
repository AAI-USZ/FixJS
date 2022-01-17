function() {
        // get the span text sizes
        var chunkTexts = {}; // set of span texts
        $.each(data.chunks, function(chunkNo, chunk) {
          chunk.row = undefined; // reset
          if (!(chunk.text in chunkTexts)) chunkTexts[chunk.text] = []
          var chunkText = chunkTexts[chunk.text];

          // here we also need all the spans that are contained in
          // chunks with this text, because we need to know the position
          // of the span text within the respective chunk text
          chunkText.push.apply(chunkText, chunk.fragments);
          // and also the markedText boundaries
          chunkText.push.apply(chunkText, chunk.markedTextStart);
          chunkText.push.apply(chunkText, chunk.markedTextEnd);
        });
        var textSizes = getTextMeasurements(
          chunkTexts,
          undefined,
          function(fragment, text) {
            if (fragment instanceof Fragment) { // it's a fragment!
              // measure the fragment text position in pixels
              var firstChar = fragment.from - fragment.chunk.from;
              if (firstChar < 0) {
                firstChar = 0;
                dispatcher.post('messages', [[['<strong>WARNING</strong>' +
                  '<br/> ' +
                  'The span [' + span.from + ', ' + span.to + '] (' + span.text + ') is not ' +
                  'contained in its designated chunk [' +
                  span.chunk.from + ', ' + span.chunk.to + '] most likely ' +
                  'due to the span starting or ending with a space, please ' +
                  'verify the sanity of your data since we are unable to ' +
                  'visualise this span correctly and will drop leading ' +
                  'space characters'
                  , 'warning', 15]]]);
              }
              var startPos = text.getStartPositionOfChar(firstChar).x;
              var lastChar = fragment.to - fragment.chunk.from - 1;
              var endPos = (lastChar < 0)
                ? startPos
                : text.getEndPositionOfChar(lastChar).x;
              fragment.curly = {
                from: startPos,
                to: endPos
              };
            } else { // it's markedText [id, start?, char#, offset]
              if (fragment[2] < 0) fragment[2] = 0;
              if (!fragment[2]) { // start
                fragment[3] = text.getStartPositionOfChar(fragment[2]).x;
              } else {
                fragment[3] = text.getEndPositionOfChar(fragment[2] - 1).x + 1;
              }
            }
          });

        // get the fragment annotation text sizes
        var fragmentTexts = {};
        var noSpans = true;
        $.each(data.spans, function(spanNo, span) {
          $.each(span.fragments, function(fragmentNo, fragment) {
            fragmentTexts[fragment.glyphedLabelText] = true;
            noSpans = false;
          });
        });
        if (noSpans) fragmentTexts.$ = true; // dummy so we can at least get the height
        var fragmentSizes = getTextMeasurements(fragmentTexts, {'class': 'span'});

        return {
          texts: textSizes,
          fragments: fragmentSizes
        };
      }