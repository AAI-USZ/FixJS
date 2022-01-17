function () {
      if (!this.photos) {
        this.photos = [];
      }

      var photos = [];

      _.each(this.photos, function (photo) {
        photos.push(photo.toJSON()['photo']);
      });

      this.set('photos', photos);
      this.trigger('change');
    }