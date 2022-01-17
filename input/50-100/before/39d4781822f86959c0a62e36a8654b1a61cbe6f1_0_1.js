function(elem, div_id) {
        var code = "if (document.getElementById('" + div_id + "') != null){"
            + "document.body.removeChild(document.getElementById('"
            + div_id + "'))}";
        if (elem.getAttribute("onclick") == undefined) {
            elem.setAttribute("onclick", code);
        }
    }