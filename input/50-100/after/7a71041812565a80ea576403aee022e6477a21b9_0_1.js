function() {

      // Clear the current table data
      this.clear();

      // Cleanup any previous table columns
      this.columns = [];
      this.sortIndex = undefined;
      this.sortAsc = undefined;
      this.headerElm.empty();

      // Add a default column to display
      $('<th class="ui-state-default ui-corner-top ui-table-cell-empty">&nbsp;</th>').appendTo(this.headerElm);
   }