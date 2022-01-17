function(){
      this.model.get("sessionFields").where({
        label : "consultants"
      })[0].set("value", this.$el.children(".session-consultant-input")
          .val());
    }