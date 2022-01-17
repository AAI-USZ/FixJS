function(match, startSpace, text, endSpace){
            startSpace = startSpace ? ' ' : '';
            endSpace = endSpace ? ' ' : '';
            return startSpace + delimiter + text + delimiter + endSpace;
          }