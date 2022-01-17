function(target) {
    // call ajax for index
    $.ajax({
      url: $(target).data("index").path,
      success: function(data, status, request) {
        $(target).data("items", data.media_resources);
        SetWidget.setup_widget(target);
      },
      error: function(request, status, error){
        SetWidget.setup_widget(target);
      },
      data: $(target).data("index").data,
      type: $(target).data("index").method
    });
    
    
    // create collection first before trying to get linked index
    $.ajax({
      url: "/media_resources/collection",
      type: "POST",
      data: { ids: $(target).data("selected_ids") },
      success: function(data) {
        $.ajax({
          url: $(target).data("linked_index").path,
          data: $.extend(true, $(target).data("linked_index").data, {collection_id: data.collection_id}),
          success: function(data, status, request) {
            $(target).data("linked_items", data.media_resources);
            SetWidget.setup_widget(target);
          },
          error: function(request, status, error){
            SetWidget.setup_widget(target);
          },
          type: $(target).data("linked_index").method
        });         
    }});
  }