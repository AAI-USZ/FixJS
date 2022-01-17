function() {
      if (show)
        $(this).attr("checked", 'checked');
      else
        $(this).removeAttr("checked");
      $(this).button('refresh');
      var graphId = GRAPH_BASE_ID + 
	$(this).attr('id').slice(SHOW_EVENTS_BASE_ID_LEN);
      showTimeShift(graphId, show);
    }