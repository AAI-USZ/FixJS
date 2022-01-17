function(_super) {

    __extends(Widget, _super);

    Widget.name = 'Widget';

    Widget.prototype.defaults = {};

    function Widget(options) {
      this.options = {};
      extend(this.options, this.defaults);
      extend(this.options, options);
      Widget.__super__.constructor.call(this, this.options);
      this.status = null;
    }

    Widget.prototype.emit = function(event) {
      if (__indexOf.call(this.events, event) >= 0) {
        this.status = event;
      }
      return Widget.__super__.emit.apply(this, arguments);
    };

    return Widget;

  }