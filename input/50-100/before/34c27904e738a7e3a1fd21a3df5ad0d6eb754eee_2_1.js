function() {
      $(".title").text(this.model.get("title"));
      $(".dateCreated").text(this.model.get("dateCreated"));
      $(".description").text(this.model.get("description"));
    }