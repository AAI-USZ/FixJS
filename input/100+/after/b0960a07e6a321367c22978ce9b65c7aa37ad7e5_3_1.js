function (done) {
    var containerName = 'images';
    var blobName = 'pic1.png';

    var devStorageBlobService = azure.createBlobService(ServiceClient.DEVSTORE_STORAGE_ACCOUNT, ServiceClient.DEVSTORE_STORAGE_ACCESS_KEY);

    var sharedAccessPolicy = {
      AccessPolicy: {
        Permissions: BlobConstants.SharedAccessPermissions.READ,
        Start: new Date('October 11, 2011 11:03:40 am GMT'),
        Expiry: new Date('October 12, 2011 11:53:40 am GMT')
      }
    };

    var sharedAccessSignature = devStorageBlobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);

    assert.equal(sharedAccessSignature.queryString[QueryStringConstants.SIGNED_START], '2011-10-11T11:03:40Z');
    assert.equal(sharedAccessSignature.queryString[QueryStringConstants.SIGNED_EXPIRY], '2011-10-12T11:53:40Z');
    assert.equal(sharedAccessSignature.queryString[QueryStringConstants.SIGNED_RESOURCE], BlobConstants.ResourceTypes.BLOB);
    assert.equal(sharedAccessSignature.queryString[QueryStringConstants.SIGNED_PERMISSIONS], BlobConstants.SharedAccessPermissions.READ);
    assert.equal(sharedAccessSignature.queryString[QueryStringConstants.SIGNATURE], '7NIEip+VOrQ5ZV80pORPK1MOsJc62wwCNcbMvE+lQ0s=');

    done();
  }