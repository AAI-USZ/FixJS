function(){
      this.model.get("sessionFields").where({
        label : "dateElicited"
      })[0].set("value", this.$el.children(".session-elicitation-date-input")
          .val());
    }