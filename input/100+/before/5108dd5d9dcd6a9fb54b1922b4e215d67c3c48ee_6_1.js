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
      welcome: _.template("<div class=\"welcome\">\n  <h1>Jumbler</h1>\n  <h3>more than a market</h3>\n</div>\n\n<a href=\"\" class=\"btn btn-primary btn-large\">Signup with Facebook</a>\n<a href=\"\" class=\"btn btn-twitter btn-large\">Signup with Twitter</a>\n\n<div class=\"separator\"><span>or</span></div>\n\n<a href=\"register\" class=\"btn btn-large\">\n  <i class=\"icon-user\"></i>\n  Signup with email\n</a>\n\n<div class=\"footnote\">\n  <a href=\"login\">Already have a Jumbler Account?</a>\n</div>")
    };
  }