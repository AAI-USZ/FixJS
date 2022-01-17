function(elem, div_id) {
        elem.setAttribute("id", div_id);
        elem.setAttribute("onclick", "document.body.removeChild(this)");
        elem.style.color = "black";
        elem.style.backgroundColor = "cornsilk";
        elem.style.position = "fixed";
        elem.style.border = "2px outset orange";
        elem.style.top = "100px";
        elem.style.left = "100px";
        elem.style.padding = "10px";
        elem.style.width = "20em";
        elem.style.zIndex = "9999";
        elem.style.fontSize = "16px";
    }