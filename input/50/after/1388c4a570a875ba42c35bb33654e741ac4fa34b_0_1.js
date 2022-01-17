function(frames, symbols) {

      return stepContains('Readability.js', frames, symbols) || hasJSFrame(frames, symbols)
          ;
    }