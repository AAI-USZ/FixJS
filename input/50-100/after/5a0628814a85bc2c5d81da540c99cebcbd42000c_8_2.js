function(){
      this.model.get("sessionFields").where({
        label : "dateElicited"
      })[0].set("value", this.$el.find(".session-elicitation-date-input")
          .val());
      
      window.appView.addUnsavedDoc(this.model.id);

    }