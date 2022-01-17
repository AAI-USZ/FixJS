function copyBlobFromIaasClient(iaasClient, sourceUri, sourceKey, destinationUri, options, callback) {
  var logger = (options || {}).logger || console;
  var errorFunc = logger.error || console.error;
  if (typeof callback !== 'function') {
    throw 'Callback is expected in copyBlobFromIaasClient(). Found: ' + utils.inspect(callback);
  }
  
  getAccountInfo(iaasClient, destinationUri, logger, function(error, destinationKey, newDestUri) {
    if (!error) {
      pageBlob.copyBlob(sourceUri, sourceKey, newDestUri, destinationKey, function(error, blob, response) {
        callback(error, blob, response, newDestUri);
      });
    } else {
      errorFunc('There was an error in getStorageAccountKeys() or getStorageAccountProperties() for ' + destinationUri);
      errorFunc(util.inspect(error));
      callback(error);
    }
  });
}