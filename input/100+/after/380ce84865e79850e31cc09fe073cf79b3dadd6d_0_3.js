function(_super) {

      __extends(MultiRegion, _super);

      function MultiRegion() {
        return MultiRegion.__super__.constructor.apply(this, arguments);
      }

      MultiRegion.prototype.open = function(view) {
        return this.$el.append(view.el);
      };

      MultiRegion.prototype.close = function() {
        var view;
        view = this.currentView;
        if (!((view != null) || view.length > 0)) {
          return;
        }
        if (!_.isArray(view)) {
          this.currentView = view = [view];
        }
        _.each(view, function(v) {
          if (v.close) {
            v.close();
          }
          return this.trigger("view:closed", v);
        }, this);
        this.currentView = [];
        return this.$el.empty();
      };

      MultiRegion.prototype.append = function(view) {
        var _ref;
        this.ensureEl();
        view.render();
        this.open(view);
        if (view.onShow) {
          view.onShow();
        }
        view.trigger("show");
        if (this.onShow) {
          this.onShow(view);
        }
        this.trigger("view:show", view);
        if ((_ref = this.currentView) == null) {
          this.currentView = [];
        }
        if (!_.isArray(this.currentView)) {
          this.currentView = [this.currentView];
        }
        return this.currentView.push(view);
      };

      return MultiRegion;

    }