function(id, content) {
            var el = $am(id);
            if (!el)
                return;
            if (el.getAttribute("js-scrolling") && el.getAttribute("js-scrolling").toLowerCase() == "yes"){
                $.cleanUpContent(el.childNodes[0], false, true);
                el.childNodes[0].innerHTML = content;
            }
            else{
                $.cleanUpContent(el, false, true);
                el.innerHTML = content;
            }
        }