function() {
      console.log("I'm a new comment!");
      var m = new Comment({
//        "label" : this.$el.children(".comment_input").val(),//TODO turn this back on

      });
      this.model.get("comments").add(m);
      window.appView.addUnsavedDoc(this.model.id);

    }