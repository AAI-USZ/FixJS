function(model, response) {
            // Render a DatumReadView for that Datum at the end of the DataListEditView
            var view = new DatumReadView({
              model : model,
              tagName : "li"
            });
            view.format = "latex";
            $('.data_list_content').append(view.render().el);
            
            // Keep track of the DatumReadView
            self.datumLatexViews.push(view);
            
            // Display the updated DatumReadView
            self.renderUpdatedPagination();
          }