function() {
  'use strict';

  var root = this;

  // Require.js allows us to configure shortcut alias
  require.config({
    paths: {
      'domReady': 'lib/require/plugins/domReady-2.0.0',
      'text': 'lib/require/plugins/text-2.0.1',
      'handlebars': 'lib/handlebars/handlebars-1.0.0.beta.6',
      'json2': 'lib/json/json2',
      'jquery': 'lib/jquery/jquery-1.7.1',
      'underscore': 'lib/underscore/underscore-1.3.3',
      'backbone': 'lib/backbone/backbone-0.9.2',
      'bootstrap': 'lib/bootstrap/bootstrap-2.0.4',
      'jquery.log': 'lib/jquery/plugins/jquery.log-1.0.0'
    },

    shim: {

      json2: {
        exports: 'JSON'
      },

      underscore: {
        exports: '_'
      },

      backbone: {
        deps:
          [
            'underscore',
            'jquery'
          ],
        exports: 'Backbone'
      },

      handlebars: {
        exports: 'Handlebars'
      },

      //jquery plugins
      'bootstrap': ['jquery'],

      'jquery.log': {
        deps: ['jquery'],
        exports: 'jQuery.fn.log'
      }
    }

  });

  //this requires dom ready to update on ui, so this function expression
  //will be implemented later when domReady.
  var updateModuleProgress = function(context, map, depMaps) {
    //when dom is not ready, do something more useful?
    if (console.log) {
      console.log('loading: ' + map.name + ' at ' + map.url);
    }
  };


  require.onResourceLoad = function(context, map, depMaps) {
    updateModuleProgress(context, map, depMaps);
  };



  require(['domReady'], function(domReady) {
    domReady(function() {
      //re-implement updateModuleProgress here for domReady
      updateModuleProgress = function(context, map, depMaps) {
        var loadingStatusEl = document.getElementById('loading-status'),
          loadingModuleNameEl = document.getElementById('loading-module-name');

        //first load
        if (loadingStatusEl && loadingModuleNameEl) {
          loadingStatusEl.innerHTML = loadingStatusEl.innerHTML += '.'; //add one more dot character
          loadingModuleNameEl.innerHTML = map.name + ' at ' + map.url;
        } else {

          //TODO later load, must have loading indicator for this then
        }


      };
    });
  });

//load jquery plugins //TODO this is a bit ugly
  require(
    [
      'jquery',
      'bootstrap',
      'jquery.log'
    ],
    function($) {

      //boot the application

      require(['app'], function(app) {
        app.initialize();
      });
    }
  );

}