function(require){

  var base = require('base');
  var abstractRouter = require('abstractRouter');

  var homePageView = require('js/view/homePageView');
  var testPageView = require('js/view/testPageView');

  var router = abstractRouter.extend({

    routes: {
      "!/home": "home",
      "!/test": "test",
      ":default": "default"
    },

    home: function(){
      if(!base.has('homePageView')){ base.set('homePageView', new homePageView); }
      base.get('homePageView').render();
      this.switchPage('homePage');
    },

    test: function(){
      if(!base.has('testPageView')){ base.set('testPageView', new homePageView); }
      base.get('testPageView').render();
      this.switchPage('testPage');
    },

    default: function(){
      this.redirect('home');
    }
  });

  return router;

}