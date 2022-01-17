function() {
      var that = this;
      var title = this.$input.val().trim();

      this.model.save({
        title: title
      }, {
        error: tooltipErrorHandler(this.$input),
        success: function(model) {
          that.$el.removeClass('editing');
        },
        wait: true
      });
    }