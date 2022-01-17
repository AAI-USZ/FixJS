function (dirResult, dirStatus) {
            if (dirStatus != google.maps.DirectionsStatus.OK) {
                switch (dirStatus){
                    case "ZERO_RESULTS" : alert ('Sorry, we can\'t provide directions to that address. Please try again.')
                        break;
                    case "NOT_FOUND" : alert('Sorry we didn\'t understand the address you entered - Please try again.');
                        break;
                    default : alert('Sorry, there was a problem generating the directions. Please try again.')
                }
                return;
            }
            // Show directions
            WPmap.dirRenderer.setMap(WPmap.map);
            WPmap.dirRenderer.setPanel(WPmap.dirContainer);
            WPmap.dirRenderer.setDirections(dirResult);
        }