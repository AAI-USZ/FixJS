function(response) {
          $('#issues-table').html(response);
          setSortable();
        }