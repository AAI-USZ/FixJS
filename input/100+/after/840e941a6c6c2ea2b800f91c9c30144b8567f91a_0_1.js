function(e) {
    var value = tabbedview.searchbox.val();
    var previous_value = tabbedview.prop('searchable_text');
    if (value === tabbedview.searchbox.attr('title')) {
      /* This prevents from reloading when the focus is set on the filter
         field (the field is empty in this state) and then the users switches
         to another applications (which results in setting the title as default
         and after that firing the event). */
      return;
    }

    if (value.length<3 && previous_value && previous_value.length > value.length) {
      tabbedview.prop('searchable_text', '');
      tabbedview.flush_params('pagenumber:int');
      tabbedview.reload_view();

    } else {
      tabbedview.flush_params('pagenumber:int');
      tabbedview.prop('searchable_text', value);
    }

    if (value.length>=3) {
      tabbedview.flush_params('pagenumber:int');
      if (jq('.tab_container').length === 0) {
        tabbedview.reload_view();
      } else {
        tabbedview.show_spinner();
        tabbedview.table.ftwtable('reload');
      }
    }
  }