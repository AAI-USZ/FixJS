function() {
      if (show)
        $(this).attr("checked", 'checked');
      else
        $(this).removeAttr("checked");
      $(this).button('refresh');
      var graphId = GRAPH_BASE_ID + 
	$(this).attr('id').slice(TIME_SHIFT_BASE_ID_LEN);
      showTimeShift(graphId, show);
    }