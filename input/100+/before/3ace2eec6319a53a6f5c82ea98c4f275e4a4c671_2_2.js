function() {

    var markerTempArray = [];

    var self = this;

    var isVisible = false;

    this.infoBox = new Object();

    var myOptions = new Object();

    userLocationMarker = this.userLocationMarker;

    google.maps.Marker.prototype.content = "";



    _.each(this.markerCollection.toArray(), function(markerModel) {

      var icon = new google.maps.MarkerImage(markerModel.get('imageUrl'),

          new google.maps.Size(17,40),

          new google.maps.Point(0,0),

          new google.maps.Point(9,40));

      var shadow = new google.maps.MarkerImage(markerModel.get('shadowUrl'),

          new google.maps.Size(49,40),

          new google.maps.Point(0,0),

          new google.maps.Point(25,40));



      var marker = new google.maps.Marker({

        position : new google.maps.LatLng(markerModel.get("latitude"), markerModel.get("longitude")),

        icon : icon,

        title : markerModel.get("title"),

        content : markerModel.get('title'),

        shadow : shadow,

        zIndex : 1

      });

      

      infoBoxOptions = {

        disableAutoPan : false,

        maxWidth : 0,

        pixelOffset : new google.maps.Size(-161, -112),

        zIndex : null,

        boxClass : "mapInfoBox",

        closeBoxURL : "",

        infoBoxClearance : new google.maps.Size(1, 1),

        isHidden : false,

        pane : "floatPane",

        enableEventPropagation : false,

        boxStyle : {

          position: "relative",

          background : "url(assets/img/sprite-map.png) no-repeat 0px 0px",

          filter: 'alpha(opacity=255)',

          width : "279px",

          height: "58px",

          padding : "8px 20px"

        }

      };

      self.infoBox = new InfoBox(infoBoxOptions);



      google.maps.event.addListener(marker, 'click', function() {

        if(self.infoBox)

          self.infoBox.close();



        var infoContent = '<p class="p_infobox_head">' + marker.content + '</p><p class="p_infobox_content">';



        if(self.userLocationMarker) {

          var distanceInformation = self.distanceCalculator(self.userLocationMarker.getPosition(), marker.getPosition());

          if(distanceInformation)

            infoContent += "Distanz: " + distanceInformation + "<br/>";

        }

        infoContent += '<a href="javascript:void(0)" onclick="window.Trinkbrunnen.routeToFountain(' + markerModel.get("id") + ')" class="calculate-route" title="Route berechnen">Route berechnen</a></p>';

        infoContent += '<div class="pointer"></div>';



        self.infoBox.setContent(infoContent);

        self.infoBox.open(self.map, marker);

        self.map.setCenter(marker.getPosition());

      });



      google.maps.event.addListener(marker, 'dblclick', function() {

        self.map.setZoom(16);

        self.map.setCenter(marker.getPosition());

      });

      markerTempArray.push(marker);



      self.markerArray.push(marker);

    });

    

    var markerClusterOptions = {

      gridSize: 45,

      styles : [{

        height : 44,

        url : 'assets/img/sprite-map.png',

        backgroundPosition: '-37px -68px',

        width : 45,

        textColor : 'white'

      }]

    };



    this.markerCluster = new MarkerClusterer(this.map, markerTempArray, markerClusterOptions);

    google.maps.event.addListener(this.markerCluster, 'clusterclick', function(cluster) {

      self.infoBox.close();

    });

    google.maps.event.addListener(this.map, 'click', function() {

      self.infoBox.close();

    });

  }