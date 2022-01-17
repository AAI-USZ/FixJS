function($, _, Backbone, Vm, twitterTemplate){

  var TwitterPage = Backbone.View.extend({

    el: '#view-pane',

    searchEL: "#search-input",
    
    searchTerm: null,

    twitterData: {
      tweets: null
    },

    // Initialize =============================================================
    
    initialize: function() {
      debug.log("Initialize Twitter Search View");
      this.fetchActivityData();
      
    },
    // ========================================================================


    events: {
      "click #submit-search" : "submitSearch",
      "keydown #search-input" : "keydown"
    },

    keydown: function(e) {
      console.log(this);
      

      if (e.keyCode === 13) {
        console.log("ENTER");
        this.fetchActivityData($(this.searchEL).val());
      };
    },

    fetchActivityData: function(searchTerm) {
      searchTerm = searchTerm || 'lvtech';
      console.log("hello from here");
      var _this = this;

      require(['app'], function (AppViewerView) {

        var _app  = Vm.create(_this, 'AppViewerView', AppViewerView);
        
        // Sending authcredentials to server for mapkey
        // if we get the mapkey then the user is authed
        $.ajax({
          url: _app.baseURL('search.json?q=%40'+searchTerm+''),
          dataType: 'jsonp',
          jsonpCallback: 'callback',
          crossDomain: true,
          statusCode: {

            200: function(data, textStatus, jqXHR) {
              console.log(data.results);
              _this.twitterData = data;
              _this.render();
            },
            401: function(data, textStatus, jqXHR) {
              debug.log("This is not the authorization I was looking for");            
            },
            410: function(data, textStatus, jqXHR) {
              debug.log("Sorry its Gone");
            }
          }
        }); 
        // End $.ajax
      });

    },

    submitSearch: function(searchTerm) {
      // event.preventDefault();

      console.log(searchTerm);
    },

    callback: function(data) {
      console.log("Hello from the callback");
      console.log(data);

    },

    // Render View =============================================================
    // ==========================================================================
    // ==========================================================================
    render: function () 
    {
      var temp = Mustache.render(twitterTemplate, this.twitterData);
      this.$el.html(temp);

      window.App.twitterView = this;
      console.log(this);
    }
    // ==========================================================================
    // ==========================================================================
    // ==========================================================================

  });

  return TwitterPage;
}