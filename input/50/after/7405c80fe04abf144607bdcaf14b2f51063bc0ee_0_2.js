function() {
      this.model.save({title: this.input.val()});
      $(this.el).removeClass("editing");
    }