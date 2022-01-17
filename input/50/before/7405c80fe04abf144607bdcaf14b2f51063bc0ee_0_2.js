function() {
      this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
    }