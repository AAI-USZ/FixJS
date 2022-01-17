function (err, data) {
      if(err) return cb(err, null);

      var widgId = data.app.guid,
          payload = {
            type: type,
            guid: fileId,
            path: path,
            name: name,
            appId: widgId
          };

      api.doFileCall(options, "delete", payload, "Error deleting file: ", cb);
    }