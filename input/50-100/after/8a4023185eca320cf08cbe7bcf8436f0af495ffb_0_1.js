function(locationPathArg, successCallback) {
      var locationPath = $.trim(locationPathArg);
      if (utils.startsWith(locationPath, that.adminPath + '/')) {
        that.errorHandler(
          'Adding sublocations to admin is not supported '+
            '(It could easily cut off access to the admin application.)');
        return;
      }
      stub.ajax('POST', 'api/locations/', {path: locationPath},
                function(newLocation) {
                  that.locations.push(newLocation);
                  ui.refresh(newLocation);
                });
    }