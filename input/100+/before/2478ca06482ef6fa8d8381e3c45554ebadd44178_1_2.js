function renderImage(err, stdout, stderr) {

        res.setHeader('Content-type', 'image/' + fileExt.substring(1));

        stdout.on('data', function(chunk) {
            res.write(chunk);
        });
        stdout.on('end', function() {
            res.end();

            // delete the temporary image, not needed anymore
            fs.unlink(tempImageFile, function (err) {
              if (err) throw err;
            });

            
        });
    }