function(target) {
    // fetch index of media sets
    $(target).data("items", []);
    new App.MediaResourceCollection({
      parameters: {
        type: "media_sets",
        accessible_action: "edit",
        with: {
          created_at: true,
          meta_data: {
            meta_key_names: ["title", "owner"]
          },
        },
      },
      onPageLoaded: function(data) {
        $(target).data("items", $(target).data("items").concat(data.media_resources));
      },
      afterCompletlyLoaded: function(data){
        $(target).data("items_loaded", true);
        SetWidget.setup_widget(target);
      }
    });
    
    // fetch media sets that are linkes with the selection
    $(target).data("linked_items", []);
    new App.MediaResourceCollection({
      ids: $(target).data("selected_ids"),
      relation: "parents",
      parameters: {
        accessible_action: "edit",
        type: "media_sets",
        with: {
          children: true
        }
      },
      onPageLoaded: function(data){
        $(target).data("linked_items", $(target).data("linked_items").concat(data.media_resources))
      },
      afterCompletlyLoaded: function(data){
        $(target).data("linked_items_loaded", true);
        SetWidget.setup_widget(target);
      } 
    });
  }