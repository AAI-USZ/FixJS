function() {

    try {

      if(!(Backbone.history.start()))

        throw "Couldn't start backbone history!";

    } catch(e) {

    }



    var self = this;

    this.markerCollection.fetch({

      success : function(){

        self.mapView.addMarkerCollection(self.markerCollection);

        self.mapView.placeMarkersToMap();

      },

      error : function() {

        if(self.isMobile()){

          alert("Trinkbrunnen konnten nicht geladen werden!");

        }

        else{

          //TODO: Think about a failure message place, when map is not scrolled up

          //self.showFailureMessage("Trinkbrunnen konnten nicht geladen werden!");

        }

      },

      add : true

    });



    if(!this.isMobile()) {

      var self = this;

      $('#search_close_button, #failure_close_button').click(function() {

        $('#address').hide();

        $('#failure').hide();

      });

      $('#activatemap').mousedown(function() {

        self.scrollMap();

      });

      //because set/get of node attribute onclick is for ie a problem

      $('#prev').click(function() {

        self.slideArticleToLeft();

      });

      $('#next').click(function() {

        self.slideArticleToRight();

      })

    }

    else{

      

      $(".menu-item").click(function(event){

        var self = this;

        switch($(this).attr('id')){

          case 'navi-position':

            $('#navi-position > a > span').css({"backgroundPosition": "-48px 0px"});

            $('#navi-position > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-position > a').css({"color": "", "backgroundColor": ""});

              $('#navi-position > a > span').css({"backgroundPosition": "0px 0px"});

            }, 250);

            break;

          case 'navi-fontain':

            $('#navi-fontain > a > span').css({"backgroundPosition": "-48px -96px"});

            $('#navi-fontain > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-fontain > a').css({"color": "", "backgroundColor": ""});

              $('#navi-fontain > a > span').css({"backgroundPosition": "0px -96px"});

            }, 250);

            break;

          case 'navi-maptype':

            $('#navi-maptype > a > span').css({"backgroundPosition": "-48px -48px"});

            $('#navi-maptype > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-maptype > a').css({"color": "", "backgroundColor": ""});

              $('#navi-maptype > a > span').css({"backgroundPosition": "0px -48px"});

            }, 250);

            break;

          case 'navi-feed':

            $('#navi-feed > a > span').css({"backgroundPosition": "-144px -48px"});

            $('#navi-feed > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-feed > a').css({"color": "", "backgroundColor": ""});

              $('#navi-feed > a > span').css({"backgroundPosition": "-96px -48px"});

            }, 250);

            break;

          case 'navi-address':

            $('#navi-address > a > span').css({"backgroundPosition": "-144px -0px"});

            $('#navi-address > a').css({"color": "#ffffff", "backgroundColor": "#8e8e8e"});

            setTimeout(function() {

              $('#navi-address > a').css({"color": "", "backgroundColor": ""});

              $('#navi-address > a > span').css({"backgroundPosition": "-96px -0px"});

            }, 250);

            break;

          default:

            break;

        }

      });

    }

  }