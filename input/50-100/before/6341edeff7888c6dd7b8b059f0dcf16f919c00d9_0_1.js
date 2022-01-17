function() {
        var fs;
        this.label = $("<label class=\"im-con-overview\">\n</label>");
        this.fillConSummaryLabel();
        this.$el.append(this.label);
        fs = $("<fieldset class=\"im-constraint-options\"></fieldset>").appendTo(this.el);
        this.drawOperatorSelector(fs);
        this.drawValueOptions();
        this.addButtons();
        return this;
      }