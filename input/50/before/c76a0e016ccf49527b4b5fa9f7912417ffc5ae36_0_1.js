function(options) {
        var context = _.extend(options, this.getContext())
        var html = this.template(options);
        this.$el.html(html);
      }