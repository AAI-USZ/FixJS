function() {
      Utils.debug("SESSION render: " + this.el);
      if(this.model == undefined){
        Utils.debug("SESSION is undefined, come back later.");
        return this;
      }
      
      try{
        if(this.model.get("sessionFields").where({label: "goal"})[0] == undefined){
          Utils.debug("SESSION fields are undefined, come back later.");
          return this;
        }
        if (this.format == "embedded") {
          this.setElement("#session-embedded");
          $(this.el).html(this.templateEmbedded(this.model.toJSON()));
          
          this.sessionFieldsView.el = this.$(".session-fields-ul");
          this.sessionFieldsView.render();
        } else if (this.format == "leftSide") {
          var jsonToRender = {
            goal : this.model.get("sessionFields").where({label: "goal"})[0].get("value"),
            consultants : this.model.get("sessionFields").where({label: "consultants"})[0].get("value"),
            date : this.model.get("sessionFields").where({label: "dateSEntered"})[0].get("value")
          };
          
          this.setElement("#session-quickview");
          $(this.el).html(this.templateSummary(jsonToRender));
        }
      }catch(e){
        Utils.debug("There was a problem rendering the session, probably the datumfields are still arrays and havent been restructured yet.");
      }
      return this;
    }