function() {
    var current, history, next;
    history = [];
    current = void 0;
    next = void 0;
    fimo.events.on("newPage", function() {
      if (current) {
        current.destroy();
        history.push(current.name);
      }
      return current = void 0;
    });
    fimo.events.on("pageLoaded", function() {
      current = next;
      next = void 0;
      fimo.events.fire("afterPageLoaded", current != null ? current.name : void 0);
      if (current) {
        return current.loaded();
      }
    });
    return {
      moveBack: function() {
        if (history.length) {
          return history.pop();
        } else {
          return void 0;
        }
      },
      add: function(name, module) {
        var view;
        view = module();
        view.name = name;
        return this[name] = function() {
          next = view;
          view['instanceArguments'] = arguments[0] || {};
          return view.template.apply(void 0, arguments);
        };
      },
      message: _.template("<div class=\"page\">\n  <%= message %>\n</div>")
    };
  }