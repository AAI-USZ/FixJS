function() {
    var setup = this;

    // Custom View
    this.View = Backbone.View.extend({
      template: "#test",

      serialize: function() {
        return { text: this.msg };
      },

      initialize: function(opts) {
        this.msg = opts.msg;
      }
    });

    // Initialize View
    this.InitView = Backbone.View.extend({
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

    this.SubView = Backbone.View.extend({
      template: "#test-sub",

      serialize: function() {
        return { text: "Right" };
      }
    });

    this.EventedListView = Backbone.View.extend({
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

      render: function(manage) {
        // Iterate over the passed collection and insert into the view
        this.collection.each(function(model) {
          this.insertView("ul", new setup.ItemView({ model: model.toJSON() }));
        }, this);

        return manage(this).render();
      }

    });

    this.ListView = Backbone.View.extend({
      template: "#list",

      render: function(manage) {
        // Iterate over the passed collection and insert into the view
        _.each(this.collection, function(model) {
          this.insertView("ul", new setup.ItemView({ model: model }));
        }, this);

        return manage(this).render();
      }
    });

    this.ItemView = Backbone.View.extend({
      template: "#test-sub",
      tagName: "li",

      serialize: function() {
        return this.model;
      }
    });
  }