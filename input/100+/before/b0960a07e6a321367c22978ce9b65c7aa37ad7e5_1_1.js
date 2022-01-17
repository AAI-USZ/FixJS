function (container, blob, sharedAccessPolicy) {
  // Validate container name. Blob name is optional.
  validateContainerName(container);

  var resourceType = BlobConstants.ResourceTypes.CONTAINER;
  if (blob) {
    resourceType = BlobConstants.ResourceTypes.BLOB;
  }

  if (!azureutil.objectIsNull(sharedAccessPolicy.AccessPolicy.Start)) {
    sharedAccessPolicy.AccessPolicy.Start = ISO8061Date.format(sharedAccessPolicy.AccessPolicy.Start);
  }

  if (!azureutil.objectIsNull(sharedAccessPolicy.AccessPolicy.Expiry)) {
    sharedAccessPolicy.AccessPolicy.Expiry = ISO8061Date.format(sharedAccessPolicy.AccessPolicy.Expiry);
  }

  var resourceName = createResourceName(container, blob);
  var signedQueryString = this.sharedAccessSignatureCredentials.generateSignedQueryString(resourceName, {}, resourceType, sharedAccessPolicy);

  var baseUrl = this.protocol + this.getHostname() + ':' + this.port;
  var path = this.getPath('/' + resourceName);

  return {
    baseUrl: baseUrl,
    path: path,
    queryString: signedQueryString,
    url: function () {
      return baseUrl + path + '?' + qs.stringify(signedQueryString);
    }
  };
}