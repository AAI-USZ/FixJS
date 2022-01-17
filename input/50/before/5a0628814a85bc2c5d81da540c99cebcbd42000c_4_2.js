function() {
      var m = new Comment({
//        "label" : this.$el.children(".comment_input").val(),

      });
      this.model.get("comments").add(m);
    }