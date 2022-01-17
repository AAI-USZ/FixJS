function() {
            // Check if images exist
            if ($('.flickrRow').length === 0) {
                // No images, don't display tweets either.
                return;
            }
            flickr_mashup.slideDown();
        }