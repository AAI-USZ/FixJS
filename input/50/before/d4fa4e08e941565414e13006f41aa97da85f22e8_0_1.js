function() {
      search_term = $(this).text();
      show_watermark(false);
      $("#searchbox").val(search_term);
      return update_history();
    }