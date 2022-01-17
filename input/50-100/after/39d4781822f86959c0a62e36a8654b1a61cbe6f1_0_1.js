function(elem, div_id) {
        if (elem.getAttribute("onclick") == undefined) {
            elem.addEventListener("click", function() {
                    var target = content.document.getElementById("mitnk-mdict-main-div");
                    if (target != null) {
                        content.document.body.removeChild(target);
                    }
                }, false);
        }
    }