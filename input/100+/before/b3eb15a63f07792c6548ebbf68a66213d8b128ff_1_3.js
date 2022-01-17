function(_super) {

    __extends(View, _super);

    View.name = 'View';

    View.prototype.events = ['create', 'complete', 'destroy'];

    function View() {
      var dataName,
        _this = this;
      View.__super__.constructor.apply(this, arguments);
      this.context = this.options.context;
      this.cookies = this.context.cookies;
      this.go = function() {
        return _this.context.go.apply(_this.context, arguments);
      };
      dataName = decamelize(this.name);
      this.el = $(this.options.el);
      this.el.data(dataName, this);
      this.el.one('remove', function(event) {
        if (event.target === _this.el[0]) {
          _this.el.data(dataName, null);
          return _this.emit('destroy');
        }
      });
      this.emit('create');
    }

    View.prototype.$ = function(selector) {
      return $(selector, this.el);
    };

    return View;

  }