function () {
      this.$el.html(this.tmpl({
        list: this.model.get('path'),
        length: this.model.get('path').length
      }));
    }