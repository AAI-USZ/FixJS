function() {

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

          }