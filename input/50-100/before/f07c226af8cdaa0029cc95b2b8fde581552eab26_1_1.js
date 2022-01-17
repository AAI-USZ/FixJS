function(Backbone, moment) {

  window.Project = Backbone.Model.extend({
    defaults: {
      type: _.str.trim("OpenSource ")
    },

    initialize: function() {
      this.set({created : moment().utc().format()});
    }
  });

}