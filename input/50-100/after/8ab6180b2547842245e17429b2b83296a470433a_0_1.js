function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $("#directionsPanel").empty();
                directionsDisplay.setDirections(response);
            }
            else {
                $("#directionsPanel").html("<h5>Route Not Found</h5>Google was unable to find one of the locations provided.");
                directionsDisplay.setDirections({routes: []});
            }
        }