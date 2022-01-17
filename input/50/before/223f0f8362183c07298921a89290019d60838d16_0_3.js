function() {
      var value = this.input.val();
      if (!value) this.clear();
      this.model.save({title: value});
      this.$e1.removeClass("editing");
    }