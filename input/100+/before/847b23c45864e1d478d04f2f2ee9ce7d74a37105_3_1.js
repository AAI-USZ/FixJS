function locationBreakdown(positions, digest) {
        var collections = [];
        var currentCollection = null;
        for (var i = 0; i < positions.length; i++){
            var position = positions[i];
            var pos1 = new google.maps.LatLng(position.position[0],position.position[1]);
            var addressAt = null;
            var matchStrength = 0;
            for (var addressType in digest.addresses){
                for (var j = 0; j < digest.addresses[addressType].length; j++){
                    var address = digest.addresses[addressType][j];
                    var pos2 = new google.maps.LatLng(address.latitude,address.longitude);
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(pos1,pos2);
                    var strength = distance - address.radius - position.accuracy;
                    if (strength < matchStrength){
                        matchStrength = strength;
                        addressAt = address;
                    }
                }
            }
            if (currentCollection == null || currentCollection.address != addressAt){
                if (currentCollection != null){
                    currentCollection[currentCollection.length] = position;
                    mergeCollection(currentCollection);
                }
                currentCollection = null;
                for (var j = 0; currentCollection == null && j < collections.length; j++){
                    if (collections[j].address == addressAt)
                        currentCollection = collections[j];
                }
                if (currentCollection == null){
                    currentCollection = [];
                    currentCollection.address = addressAt;
                    currentCollection.lastMerge = 0;
                    collections[collections.length] = currentCollection;
                }
            }
            currentCollection[currentCollection.length] = position;
        }
        for (var i = 0; i < collections.length ; i++){
            mergeCollection(collections[i]);
            drawCollection(collections[i]);
        }
	}