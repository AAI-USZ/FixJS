function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          self.set("rawText", evt.target.result);
//          document.getElementById('byte_range').textContent = [ '' ]
//          .join('');
        }
      }