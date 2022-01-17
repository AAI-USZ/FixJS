function _addCssFile(filename) {
        var stylesheet = doc.createElement("link");
        stylesheet.setAttribute("rel", "stylesheet");
        stylesheet.setAttribute("type", "text/css");
        stylesheet.setAttribute("href", filename);
        doc.getElementsByTagName("head")[0].appendChild(stylesheet);
    }