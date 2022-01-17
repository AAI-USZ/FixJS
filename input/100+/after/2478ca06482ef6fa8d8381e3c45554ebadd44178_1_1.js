function (imageResponse) {
    
      // check that the response is acceptable. Should be a 200.
      if ( imageResponse.statusCode != 200 ) {
        res.send('url ' + remoteUrl + ' did not return 200', 404);
        return;
      }
      
      // get the mime type from the response, check it is accetpable
      var mimeType = imageResponse.headers['content-type'];
      if ( ! validMimeTypes[mimeType] ) {
        res.send('Can not handle mime type ' + mimeType, 404);
        return;          
      }
    
      var fileExt       = mime.extension( mimeType );
      var tempImageFile = temp.path({suffix: '.'+fileExt});
      var writeStream   = fs.createWriteStream(tempImageFile);
    
      imageResponse
        .on('data', function (chunk) {
          writeStream.write(chunk);
        })
        .on('end', function() {
          writeStream.end(function() {

            var image = gm( tempImageFile );
                
            if( req.param('resize') ) {
              var newWidth  = req.param('width');
              var newHeight = req.param('height');
                
              if( !newHeight && !newWidth) {
                res.send('need one of height and/or width to resize', 404);
                return;          
              }                

              image = image.resize(newWidth, newHeight);
            }
                
            if ( req.param('grayscale')) {
              image = image.type('grayscale');
            }
                
            if ( req.param('format') ) {
              image    = image.setFormat( req.param('format') );
              mimeType = req.param('format');      
            }
                
            // all done - render the image
            image.stream( function (err, stdout, stderr) {
              if (err) return next(err);
              stderr.pipe(process.stderr);
                
              res.writeHead( 200, {"Content-Type": mimeType});

              // pipe the output straight to the response.
              stdout.pipe(res);
              
              // at the end delete the temporary file.
              stdout.on("end", function() {
                fs.unlink(tempImageFile);
              });

            });

          });
        });
    
    }