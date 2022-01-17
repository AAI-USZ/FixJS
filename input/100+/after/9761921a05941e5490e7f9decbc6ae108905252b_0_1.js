function(target_div, text, doc) {
        while (target_div.hasChildNodes()) {
            target_div.removeChild(target_div.lastChild);
        }
        var elem = jsonToDOM(["span", {}, text], doc, {});
        target_div.appendChild(elem);
    }