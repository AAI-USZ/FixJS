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
          chunkText.push.apply(chunkText, chunk.spans);
          // and also the markedText boundaries
          chunkText.push.apply(chunkText, chunk.markedTextStart);
          chunkText.push.apply(chunkText, chunk.markedTextEnd);
        });
        var textSizes = getTextMeasurements(
          chunkTexts,
          undefined,
          function(span, text) {
            if (span.text !== undefined) { // it's a span!
              // measure the span text position in pixels
              var firstChar = span.from - span.chunk.from;
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
              var lastChar = span.to - span.chunk.from - 1;
              var endPos = (lastChar < 0)
                ? startPos
                : text.getEndPositionOfChar(lastChar).x;
              span.curly = {
                from: startPos,
                to: endPos
              };
            } else { // it's markedText [id, start?, char#, offset]
              if (span[2] < 0) span[2] = 0;
              if (!span[2]) { // start
                span[3] = text.getStartPositionOfChar(span[2]).x;
              } else {
                span[3] = text.getEndPositionOfChar(span[2] - 1).x + 1;
              }
            }
          });

        // get the span annotation text sizes
        var spanTexts = {};
        var noSpans = true;
        $.each(data.spans, function(spanNo, span) {
          spanTexts[span.glyphedLabelText] = true;
          noSpans = false;
        });
        if (noSpans) spanTexts.$ = true; // dummy so we can at least get the height
        var spanSizes = getTextMeasurements(spanTexts, {'class': 'span'});

        return {
          texts: textSizes,
          spans: spanSizes
        };

        // XXX NOTE
        // var textHeight = measureBox.height; // => sizes.texts.height
        // curlyY = measureBox.y;              // => sizes.texts.y
      }