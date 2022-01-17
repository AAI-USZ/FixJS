function ($) {
  
  Friend = Backbone.Model.extend({
    name: null
  });
  
  Friends = Backbone.Collection.extend({
    initialize: function (models, options) {
    }
  });
  
  AppView = Backbone.View.extend({
    el: $("body"),
    initialize: function () {
    },
    events: {
      "click #display-all":  "showAll",
      "keyup #facter-request": "showNewText",
    },
    showAll: function () {
      $("#fact-text").load('/all');
    },
    showNewText: function () {
      var dataName = '/fact/' + $("#facter-request").val();
      $("#fact-text").load(dataName);
    }
  });
  
  var appview = new AppView;

}