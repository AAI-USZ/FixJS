function(e) {
        var code = e.keyCode || e.which;
        
        // code == 13 is the enter key
        if (code == 13) {
          this.insertNewDatumTag()
        }
      }