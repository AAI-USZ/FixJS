function(_super) {

    __extends(FormField, _super);

    function FormField() {
      return FormField.__super__.constructor.apply(this, arguments);
    }

    FormField.prototype.errorMessage = "Required";

    FormField.prototype.initialize = function() {
      var _this = this;
      this.getErrorTip();
      this.input = this.options.input;
      this.$input = $(this.input);
      this.$input.on("change blur keyup", function() {
        return _this._onChange();
      });
      this.$input.on("change blur", function() {
        return _this.validate();
      });
      this.$input.on("focus", function() {
        return _this.showTooltip();
      });
      this.$input.on("blur", function() {
        return _this.hideTooltip();
      });
      /*
          @$input.on "change", =>
            if @valid()
              @hideTooltip()
            else
              @showTooltip()
      */

      return this.required = function() {
        return this.input.required;
      };
    };

    FormField.prototype.value = function() {
      return $.trim(this.input.value);
    };

    FormField.prototype.valid = function() {
      var value;
      value = this.value();
      if (this.required() && value === '') {
        return false;
      }
      return true;
    };

    FormField.prototype.validate = function() {
      if (this.valid()) {
        this.hideError();
      } else {
        this.showError();
      }
      return this;
    };

    FormField.prototype.showTooltip = function() {
      return this.$el.addClass("tooltip-open");
    };

    FormField.prototype.hideTooltip = function() {
      return this.$el.removeClass("tooltip-open");
    };

    FormField.prototype.showError = function() {
      return this.$el.addClass("error");
    };

    FormField.prototype.hideError = function() {
      return this.$el.removeClass("error");
    };

    FormField.prototype.getErrorTip = function() {
      return this.$tooltip || (this.$tooltip = this.$(".tooltip").length ? this.$(".tooltip") : $("<div class='tooltip'>" + this.errorMessage + "</div>").appendTo(this.el));
    };

    FormField.prototype._onChange = function() {
      return this.trigger("change");
    };

    return FormField;

  }