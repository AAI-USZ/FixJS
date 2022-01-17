function(){

    var geocoder = new google.maps.Geocoder();

    var address = $('input[name=address]').val();

    this.blurAllElements();

    

    var self = this;

    geocoder.geocode({ 'address': address}, function(results, status) {

      if(status == google.maps.GeocoderStatus.OK){

        self.mapView.map.setCenter(results[0].geometry.location);

		    self.mapView.map.fitBounds(results[0].geometry.viewport);

    		$(self.el).hide();

    		

    		if(self.mapView.infoBox){

    		  self.mapView.infoBox.close();

    		}

      }

      else{

        $(self.el).hide();

        if(self.isMobile()){

          alert('Keine Suchergebnisse!');

        }

        else{

          self.showFailureMessage("Keine Suchergebnisse!");

        }

        self.blurAllElements();

      }

    });

  }