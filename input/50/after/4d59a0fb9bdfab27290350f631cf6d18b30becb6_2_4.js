function(latLng) {
      if (latLng) {
        return [latLng.lat(), latLng.lng()];
      } else {
        return [];
      }
    }