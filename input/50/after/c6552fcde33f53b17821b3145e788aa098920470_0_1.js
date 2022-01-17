function(e) {
      if (editable && cursor.selection) {
        setTimeout(function() {
          cursor.deleteSelection();
          cursor.parent.bubble('redraw');
        });
      }

      e.stopPropagation();
    }