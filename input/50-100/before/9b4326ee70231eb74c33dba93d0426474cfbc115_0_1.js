function(options, appId, path, name, fileType, cb) {
    var payload = {
      app: appId,
      filePath: path,
      fileName: name,
      type:fileType
    };

    api.doFileCall(options, "create", payload, "Error creating file: ", cb);
  }