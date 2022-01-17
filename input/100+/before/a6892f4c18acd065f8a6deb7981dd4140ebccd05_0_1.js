function (AppViewerView) {

        var _app  = Vm.create(_this, 'AppViewerView', AppViewerView);
        
        // Sending authcredentials to server for mapkey
        // if we get the mapkey then the user is authed
        $.ajax({
          url: _app.baseURL('search.json?q=%40lvtech'),
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
      }