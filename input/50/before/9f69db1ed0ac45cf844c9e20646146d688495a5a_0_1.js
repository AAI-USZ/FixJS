function(require){

  var abstractView = require('abstractView');

  var homePageView = abstractView.extend({
    el: '#homePage',

    // ----------------------------

    render: function(){
      this.$el.html('test');
    }
  });

}