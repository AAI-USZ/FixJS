function(text) {
      var rows = text.split("\n");
      for(l in rows){
        rows[l] = this.parseLineCSV(rows[l]);
      }
      
      this.set("asCSV", rows);
    }