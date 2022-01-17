function() {

            file.end();

            if(!validateMime(tempImageFile))
                throw "Error: Unsupported file type.";

            var outputImage = gm(tempImageFile);

            if(req.param('resize') == 1)
            {
                var newWidth = req.param('width');
                var newHeight = req.param('height');

                if(newHeight == null && newWidth == null)
                    throw("Error: At least one parameter from height or width should be defined.");
                else
                {
                    outputImage = outputImage.resize(newWidth, newHeight);
                }
            }

            if(req.param('grayscale') == 1)
            {
                outputImage = outputImage.type('grayscale');
            }

            if(req.param('format') != undefined)
            {
                outputImage = outputImage.setFormat(req.param('format'));
                imageType = req.param('format');
            }

            outputImage.stream(renderImage);
        }