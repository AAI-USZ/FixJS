function (err, stdout, stderr) {
              if (err) return next(err);
              stderr.pipe(process.stderr);
                
              res.writeHead( 200, {"Content-Type": mimeType});

              // pipe the output straight to the response.
              stdout.pipe(res);
              
              // at the end delete the temporary file.
              stdout.on("end", function() {
                fs.unlink(tempImageFile);
              });

            }