function(existingPlace) {
      if (!existingPlace)
        this.db.savePlace(place, callback);
    }