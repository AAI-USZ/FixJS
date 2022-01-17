function() {

    var mapCenter = this.mapView.map.getCenter();



    if($('#map-wrap').css('top') == '250px') {

      $('#map-wrap').css('min-height', '0px');

      $('#address').hide();

      $('#navigation').animate({

        opacity : 0

      }, 500, function() {

        $('#navigation').hide();

      });

      $('#map-wrap').animate({

        top : 544

      }, 1000, function() {

        $('#activatemap').show();

        $('#scroll').text('Karte vergrößern ↑');

        window.Trinkbrunnen.mapView.resizeMap();

        window.Trinkbrunnen.mapView.map.setCenter(mapCenter);

      });

      if(this.routes[Backbone.history.fragment] == 'showRssFeed') {

        $('#feed').show();

      }

      $('#appinfo, #info, #feed, #hand-phone').animate({

        opacity : 1

      }, 1000);



    } else {

      $('#map-wrap').animate({

        top : 250

      }, 1000, function() {

        $('#map-wrap').css('min-height', '294px');

        $('#navigation').show().animate({

          opacity : 1

        }, 500);

        window.Trinkbrunnen.mapView.resizeMap();

        window.Trinkbrunnen.mapView.map.setCenter(mapCenter);

        $('#activatemap').hide();

        $('#scroll').text('Karte verkleinern ↓');

      });

      $('#appinfo, #info, #feed, #hand-phone').animate({

        opacity : 0

      }, 1000, function() {

        $('#feed').css('display', 'none');

      });

    }

  }