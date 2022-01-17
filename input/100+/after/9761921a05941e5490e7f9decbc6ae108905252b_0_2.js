function(doc, div_id) {
        var main_div = doc.getElementById(div_id);
        if (main_div == null) {
            main_div = doc.body.appendChild(doc.createElement("div"));
            this.clickify(main_div, div_id);
        }
        return main_div;
    }