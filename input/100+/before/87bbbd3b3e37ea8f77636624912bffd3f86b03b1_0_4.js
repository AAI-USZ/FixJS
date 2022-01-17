function (file, opt_startByte, opt_stopByte) {
      //console.log(this);
      var start = parseInt(opt_startByte) || 0;
      var stop = parseInt(opt_stopByte) || file.size - 1;
      var reader = new FileReader();

      var self = this;
      // If we use onloadend, we need to check the readyState.
      reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          self.set("rawText", evt.target.result);
//          document.getElementById('byte_range').textContent = [ '' ]
//          .join('');
        }
      };
      var blob = '';
      if (file.webkitSlice) {
        blob = file.webkitSlice(start, stop + 1);
      } else if (file.mozSlice) {
        blob = file.mozSlice(start, stop + 1);
      }
      reader.readAsBinaryString(blob);
//      reader.readAsText(file);
    }