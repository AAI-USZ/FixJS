function() {
      var data = {
        title : this.options.title,
        description : this.options.description
      };

      this.$el.html(Mustache.to_html(this.template, data));

      // hide arrow box
      this.$el.find('ul').hide();

      // create a fast back button
      new google.ui.FastButton(this.$el.find('.back').get(0), this.back);

      return this;
    }