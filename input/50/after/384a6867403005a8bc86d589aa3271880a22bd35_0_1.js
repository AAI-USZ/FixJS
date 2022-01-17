function(callback) {
        Kinetic.Type._getImage(this.toDataURL(), function(img) {
            callback(img);
        });
    }