function() {
      // Remove all the DatumReadViews that are currently being displayed
      while (this.datumLatexViews.length > 0) {
        var datumLatexView = this.datumLatexViews.pop();
        datumLatexView.remove();
      }

      // Display the first page of Datum and the pagination footer
      for (i = 0; i < this.perPage; i++) {
        var datumId = this.model.get("datumIds")[i];
        if (datumId) {
          this.addOne(datumId);
        }
      }
    }