function (doc, id) {
        var div = doc.getElementById(id);
        if (! div) {
            div = doc.createElement("div");
            div.style.visibility = "hidden";
            div.style.width = "0px";
            div.style.height = "0px";
            div.style.position = "absolute";
            div.style.top = "-10000px";
            div.style.left = "-10000px";
            div.id = id;
            doc.getElementsByTagName("body")[0].appendChild(div);
        }

        return div;
    }