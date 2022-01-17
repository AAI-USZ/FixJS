function() {
        var errmsg = getRequest.error && getRequest.error.name
        if (errback)
          errback(errmsg);
        else
          console.error('DeviceStorageDB.getFile:', errmsg);
      }