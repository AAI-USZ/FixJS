function(){
      this.model.get("sessionFields").where({
        label : "goal"
      })[0].set("value", this.$el.find(".session-goal-input")
          .val());
      
      window.appView.addUnsavedDoc(this.model.id);

    }