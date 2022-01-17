function(req, response) {
    console.log('Client is uploading a file');
    var filename = req.headers['x-file-name'];
    var id = idgen();
    var buffers = [];
    console.log('Original filename: ' + filename);
    console.log('Assigned ID: ' + id);

    // Data
    var data = {
      id: id,
      survey: req.params.sid,
      filename: filename,
      mimetype: req.headers['x-mime-type'],
      url: makeDownloadPath(id, req),
      status: STATUS_PENDING
    };

    getCollection(function(err, collection) {
      // Store the image data in buffers
      req.on('data', function(data) {
        buffers.push(data);
      });

      // When the upload has finished, we can figure out the content length
      // and send to Amazon.
      // TODO: use S3 Multipart uploads so we don't have to keep the whole
      // file around in Buffer objects.
      req.on('end', function() {
        var contentLength = buffers.reduce(function(len,el) { return len + el.length; }, 0);
        var s3request = s3client.put(makeS3Location(id), {
          'Content-Length': contentLength,
          'Content-Type': data.mimetype
        });

        // When we receive the S3 response, we're done.
        s3request.on('response', function(res) {
          res
          .on('data', function(chunk) { console.log(chunk.toString()); })
          .on('close', function(error) { console.log(error.message); })
          .on('end', function() {
            // TODO: return the DB doc instead?
            body = JSON.stringify({success: 'true', name: [UPLOAD_DIR, filename].join('/')});

            // Add image info to the database.
            collection.insert(data, function() {
              response.send(body, 201);
              console.log('Added file info:');
              console.log(JSON.stringify(data, null, '  '));

              // Track that we have pending scans
              workChecker.gotWork();
            });
          });
        });

        // Write to the S3 request.
        for (var i=0; i<buffers.length; i++) {
          console.log('Writing chunk ' + i + ' of ' + buffers.length + ' to S3.');
          s3request.write(buffers[i]);
        }
        s3request.end();
      });
    });
  }