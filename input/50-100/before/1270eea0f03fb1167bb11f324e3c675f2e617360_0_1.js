function (doc, width, height) {
        var html = serializeToXML(doc),
            imgWidth = width || 100,
            imgHeight = height || 100;

        return (
            '<svg xmlns="http://www.w3.org/2000/svg" width="' + imgWidth + '" height="' + imgHeight + '">' +
                '<foreignObject width="100%" height="100%">' +
                    html +
                '</foreignObject>' +
            '</svg>'
        );
    }