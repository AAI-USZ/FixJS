function(e) {
        if(e.keyCode === 13) {
          this.table.renameColumn(this.column[0], $('.col_name_edit').val());
          this.editing_name = false;
          this.render();
        }
      }