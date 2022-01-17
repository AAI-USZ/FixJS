function() {
      Utils.debug("SESSION render: " + this.el);
      if (this.model == undefined) {
        Utils.debug("SESSION is undefined, come back later.");
        return this;
      }
      
      try {
        if (this.model.get("sessionFields").where({label: "goal"})[0] == undefined) {
          Utils.debug("SESSION fields are undefined, come back later.");
          return this;
        }
        if (this.format == "embedded") {
          this.setElement("#session-embedded");
          $(this.el).html(this.templateEmbedded(this.model.toJSON()));
          
          this.sessionFieldsView.el = this.$(".session-fields-ul");
          this.sessionFieldsView.render(); 
          // Display the CommentEditView
          this.commentEditView.el = this.$('.comments');
          this.commentEditView.render();
         
        } else if (this.format == "leftSide") {
          var jsonToRender = {
            goal : this.model.get("sessionFields").where({label: "goal"})[0].get("value"),
            consultants : this.model.get("sessionFields").where({label: "consultants"})[0].get("value"),
            dateElicited : this.model.get("sessionFields").where({label: "dateElicited"})[0].get("value")
          };
          
          this.setElement("#session-quickview");
          $(this.el).html(this.templateSummary(jsonToRender)); 
          
        } else if (this.format == "fullscreen") {
          this.setElement("#session-fullscreen");
          $(this.el).html(this.templateFullscreen(this.model.toJSON()));
          
          this.sessionFieldsView.el = this.$(".session-fields-ul");
          this.sessionFieldsView.render();
          // Display the CommentEditView
          this.commentEditView.el = this.$('.comments');
          this.commentEditView.render();
          
        } else if (this.format == "link") {
          $(this.el).html(this.templateLink(this.model.toJSON()));
          
        } else {
          throw("You have not specified a format that the SessionReadView can understand.");
        }
      } catch(e) {
        Utils.debug("There was a problem rendering the session, probably the datumfields are still arrays and havent been restructured yet.");
      }
      return this;
    }