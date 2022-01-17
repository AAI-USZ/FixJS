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
          }