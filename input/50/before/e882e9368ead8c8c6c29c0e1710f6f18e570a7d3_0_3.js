function(){
      this.model.get("sessionFields").where({
        label : "goal"
      })[0].set("value", this.$el.children(".session-goal-input")
          .val());
    }