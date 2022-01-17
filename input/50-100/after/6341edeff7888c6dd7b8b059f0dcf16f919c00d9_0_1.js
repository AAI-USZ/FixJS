function() {
        var fs;
        this.label = $("<label class=\"im-con-overview\">\n</label>");
        this.fillConSummaryLabel();
        this.$el.append(this.label);
        fs = $("<fieldset class=\"im-constraint-options\"></fieldset>").appendTo(this.el);
        this.drawOperatorSelector(fs);
        this.drawValueOptions();
        this.$el.append("<div class=\"alert alert-error span10\">\n    <i class=\"icon-warning-sign\"></i>\n    " + intermine.conbuilder.messages.CantEditConstraint + "\n</div>");
        this.addButtons();
        return this;
      }