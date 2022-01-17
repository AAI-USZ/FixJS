function(options, appId, path, name, fileType, cb) {
    var payload = {
      filePath: path,
      fileName: name,
      type:fileType,
      widget: appId
    };

    api.doFileCall(options, "create", payload, "Error creating file: ", cb);
  }