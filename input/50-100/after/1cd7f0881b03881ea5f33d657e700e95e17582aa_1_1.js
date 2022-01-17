function(e) {
        return $.post('/Editor/Update', {
          id: localStorage.getItem("updateId"),
          jsonString: escape(JSON.stringify(this.model.toJSON(false, true))),
          htmlContents: escape(JSON.stringify(ImpressRenderer.render(this.model.attributes)))
        }, function(data) {
          return $('body').append("Successfully posted to the page.");
        });
      }