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
          }