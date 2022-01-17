function() {
      search_term = $(this).text();
      show_watermark(false);
      $("#searchbox").val(search_term);
      $("#explanation").modal('hide');
      return update_history();
    }