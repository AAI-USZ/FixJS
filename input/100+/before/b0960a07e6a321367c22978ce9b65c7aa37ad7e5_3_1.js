function (done) {
    var containerName = testutil.generateId(containerNamesPrefix, containerNames, blobtestutil.isMocked);
    var blobName = 'blobs/' + testutil.generateId(blobNamesPrefix, blobNames, blobtestutil.isMocked);
    var blobText = 'Hello World!';

    blobService.createContainer(containerName, function (createError) {
      assert.equal(createError, null);

      // Create the empty page blob
      blobService.createBlockBlobFromText(containerName, blobName, blobText, function (err) {
        assert.equal(err, null);

        blobService.getBlobProperties(containerName, blobName, function (error, properties) {
          assert.equal(error, null);
          assert.equal(properties.container, containerName);
          assert.equal(properties.blob, blobName);

          done();
        });
      });
    });
  }