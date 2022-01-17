function(css) {
        var link=document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", css);
        if (typeof link!="undefined") {
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    }