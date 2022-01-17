function(){

  var Tally = Backbone.Model.extend({

    defaults: function() {
      return {
        title: "empty tally...",
        order: Tallys.nextOrder(),
        count: 0
      };
    },

    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
    },

    increment: function() {
      this.set({"count": this.get("count")+1});
    },

    decrement: function() {
      var cur_count = this.get("count");  
      if (cur_count > 0) {
        this.set({"count": cur_count-1});
      }
    },

    clear: function() {
      this.destroy();
    }

  });

  var TallyList = Backbone.Collection.extend({
  
    model: Tally,

    localStorage: new Store("tallys-backbone"),

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order');
    },

    comparator: function(tally) {
      return tally.get('order');
    }

  });

  var Tallys = new TallyList;

  var TallyView = Backbone.View.extend({
    
    tagName:  "li",
    
    template: _.template($('#item-template').html()),

    events: {
      "click .inc"      : "inc",
      "click .dec"      : "dec",
      "dblclick .view"  : "edit",
      "click a.destroy" : "clear",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    },

    inc: function() {
      this.model.increment();
    },

    dec: function() {
      this.model.decrement();
    },

    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    close: function() {
      var value = this.input.val();
      if (!value) this.clear();
      this.model.save({title: value});
      this.$el.removeClass("editing");
    },

    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    clear: function() {
      this.model.clear();
    }

  });


  var AppView = Backbone.View.extend({
    
    el: $("#tallyapp"),

    events: {
      "keypress #new-tally": "createOnEnter"
    },

    initialize: function() {
      
      this.input = this.$("#new-tally");
      
      Tallys.on('add', this.addOne, this);
      Tallys.on('reset', this.addAll, this);
      Tallys.on('all', this.render, this);

      this.main = $('#tallys');

      Tallys.fetch();
    },

    render: function() {
      if (Tallys.length) {
        this.main.show();
      } else {
        this.main.hide();
      }
    },

    addOne: function(tally) {
      var view = new TallyView({model: tally});
      this.$("#tally-list").append(view.render().el);
    },

    addAll: function() {
      Tallys.each(this.addOne);
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;

      Tallys.create({title: this.input.val()});
      this.input.val('');
    }

  });

  var App = new AppView;

}