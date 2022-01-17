function() {
      var m = new Comment({
        "text" : this.$el.find(".add-comment").val(),
//        "username" : 
     });
      
      // Add new comment to the db ? 
      this.model.get("comments").add(m);
    }