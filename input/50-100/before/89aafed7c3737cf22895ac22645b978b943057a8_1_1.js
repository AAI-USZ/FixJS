function() {
      this.$(".roomHostImage[title]").qtip({
        style : {
          classes : "ui-tooltip-blue ui-tooltip-shadow ui-tooltip-rounded"
        }
      });
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }