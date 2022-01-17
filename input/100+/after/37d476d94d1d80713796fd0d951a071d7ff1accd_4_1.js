function(datumId) {
      // Get the corresponding Datum from PouchDB 
      var d = new Datum({
        corpusname : window.app.get("corpus").get("corpusname")
      });
      d.id = datumId;
      var self = this;
      d.changeCorpus(window.app.get("corpus").get("corpusname"), function(){
        d.fetch({
          success : function(model, response) {
            // Render a DatumReadView for that Datum at the end of the DataListEditView
            var view = new DatumReadView({
              model : model,
              tagName : "li"
            });
            view.format = "latex";
            $('#data_list_content').append(view.render().el);
            
            // Keep track of the DatumReadView
            self.datumLatexViews.push(view);
            
            // Display the updated DatumReadView
            self.renderUpdatedPagination();
          },
          
          error : function() {
            Utils.debug("Error fetching datum: " + datumId);
          }
        });
      });
    }