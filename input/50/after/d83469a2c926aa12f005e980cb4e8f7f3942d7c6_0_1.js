function(model, response) {
              // Render at the top
              self.datumsView.collection.add(model, {at:0});
              
              // Display the updated data list
              appView.renderReadonlyDataListViews();
              appView.renderEditableDataListViews();
            }