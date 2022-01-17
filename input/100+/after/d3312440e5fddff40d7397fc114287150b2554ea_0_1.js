function(_super) {

      __extends(ErrorView, _super);

      function ErrorView() {
        return ErrorView.__super__.constructor.apply(this, arguments);
      }

      ErrorView.prototype.template = require('jade!../templates/error-flash')();

      ErrorView.prototype.render = function() {
        return this.$el.html(_.template(this.template, this.serializeData()));
      };

      ErrorView.prototype.serializeData = function() {
        return {
          message: this.options.message
        };
      };

      return ErrorView;

    }