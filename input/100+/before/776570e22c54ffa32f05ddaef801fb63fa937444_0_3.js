function(target_div, define, doc) {
        while (target_div.hasChildNodes()) {
            target_div.removeChild(target_div.lastChild);
        }
        var elem = jsonToDOM(["div", {},
                ["span", {style: "color:red"}, define.word],
                ["span", {}, " ["],
                ["span", {style: "color:green"}, define.pron],
                ["span", {}, "] "],
                ["span", {}, define.pos + " "],
                ["span", {style: "color:blue"}, define.acceptation],
                ["br"],
                ["br"],
                ["span", {}, define.gloss],
            ], doc, {});
        target_div.appendChild(elem);
    }