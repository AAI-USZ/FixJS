function(target_div, text, doc) {
        while (target_div.hasChildNodes()) {
            target_div.removeChild(target_div.lastChild);
        }
        var elem = mitnk_mdict_json_to_dom(["span", {}, text], doc, {});
        target_div.appendChild(elem);
    }