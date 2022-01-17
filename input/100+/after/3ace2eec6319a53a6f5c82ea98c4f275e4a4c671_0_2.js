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

            $('#navi-position > a > span').addClass('navigation-position-a-active-span');

            $('#navi-position > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-position > a').removeClass('navigation-a-active');

              $('#navi-position > a > span').removeClass('navigation-position-a-active-span');

            }, 500);

            break;

          case 'navi-fontain':

            $('#navi-fontain > a > span').addClass('navigation-fontain-a-active-span');

            $('#navi-fontain > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-fontain > a').removeClass('navigation-a-active');

              $('#navi-fontain > a > span').removeClass('navigation-fontain-a-active-span');

            }, 500);

            break;

          case 'navi-maptype':

            $('#navi-maptype > a > span').addClass('navigation-maptype-a-active-span');

            $('#navi-maptype > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-maptype > a').removeClass('navigation-a-active');

              $('#navi-maptype > a > span').removeClass('navigation-maptype-a-active-span');

            }, 350);

            break;

          case 'navi-feed':

            $('#navi-feed > a > span').addClass('navigation-feed-a-active-span');

            $('#navi-feed > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-feed > a').removeClass('navigation-a-active');

              $('#navi-feed > a > span').removeClass('navigation-feed-a-active-span');

            }, 350);

            break;

          case 'navi-address':

            $('#navi-address > a > span').addClass('navigation-address-a-active-span');

            $('#navi-address > a').addClass('navigation-a-active');

            setTimeout(function() {

              $('#navi-address > a').removeClass('navigation-a-active');

              $('#navi-address > a > span').removeClass('navigation-address-a-active-span');

            }, 500);

            break;

          default:

            break;

        }

      });

    }

  }