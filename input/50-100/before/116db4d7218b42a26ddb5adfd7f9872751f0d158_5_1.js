function() {
      var title = this.$input.val().trim();
      var that = this;

      this.model.save({
        title: title
      }, {
        error: tooltipErrorHandler(this.$input),
        success: function(model) {
          that.$el.removeClass('editing');
        }
      });
    }