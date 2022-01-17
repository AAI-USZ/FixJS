function (svg, canvas, callback) {
        var context, DOMURL, url, image;

        workAroundBrowserBugForBackgroundImages(canvas, svg);

        context = canvas.getContext("2d");

        url = buildImageUrl(svg);

        image = new window.Image();
        image.onload = function() {
            context.drawImage(image, 0, 0);
            cleanUpUrl(url);

            if (typeof callback !== "undefined" && callback) {
                callback(canvas);
            }
        };
        image.src = url;
    }