function() {
      console.log("I'm a new comment!");
      var m = new Comment({
        "text" : this.$el.find(".add-comment").val(),
      });
      this.model.get("comments").add(m);
    }