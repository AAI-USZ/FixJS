function(options) {
        var context = _.extend(options, this.addContext())
        var html = this.template(options);
        this.$el.html(html);
      }