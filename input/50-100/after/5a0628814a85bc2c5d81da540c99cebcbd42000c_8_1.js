function(){
      this.model.get("sessionFields").where({
        label : "consultants"
      })[0].set("value", this.$el.find(".session-consultant-input")
          .val());
      
      window.appView.addUnsavedDoc(this.model.id);

    }