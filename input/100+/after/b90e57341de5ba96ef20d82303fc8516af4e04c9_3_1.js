function() {
    var setup = this;

    // Custom View
    this.View = Backbone.LayoutView.extend({
      template: "#test",

      serialize: function() {
        return { text: this.msg };
      },

      initialize: function(opts) {
        this.msg = opts.msg;
      }
    });

    // Initialize View
    this.InitView = Backbone.LayoutView.extend({
      template: "#test",

      serialize: function() {
        return { text: this.msg };
      },

      initialize: function(opts) {
        this.msg = opts.msg;

        this.setViews({
          ".inner-right": new setup.SubView()
        });
      }
    });

    this.SubView = Backbone.LayoutView.extend({
      template: "#test-sub",

      serialize: function() {
        return { text: "Right" };
      }
    });

    this.EventedListView = Backbone.LayoutView.extend({
      template: "#list",

      initialize: function() {
        this.options.fetch = function(path) {
          var done = this.async();

          window.setTimeout(function() {
            done(_.template($(path).html()));
          }, 15000);
        };

        this.collection.bind("reset", function() {
          this.render();
        }, this);
      },

      beforeRender: function() {
        this.collection.each(function(model) {
          this.insertView("ul", new setup.ItemView({ model: model.toJSON() }));
        }, this);
      }
    });

    this.ListView = Backbone.LayoutView.extend({
      template: "#list",

      beforeRender: function() {
        // Iterate over the passed collection and insert into the view
        _.each(this.collection, function(model) {
          this.insertView("ul", new setup.ItemView({ model: model }));
        }, this);
      }
    });

    this.ItemView = Backbone.LayoutView.extend({
      template: "#test-sub",
      tagName: "li",

      serialize: function() {
        return this.model;
      }
    });
  }