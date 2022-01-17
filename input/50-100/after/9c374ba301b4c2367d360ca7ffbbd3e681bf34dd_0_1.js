function(cell, date) {
      var day = date.format("yyyy-mm-dd");
      var entries = dayEntries[day];
      if (entries !== undefined){
        cell.addClass('fc-xdate');
        cell.click(function() {
          if (cell.hasClass('fc-xdate')){
            renderEntries(entries);
          }
        });
      } else {
        cell.removeClass('fc-xdate');
      }
    }