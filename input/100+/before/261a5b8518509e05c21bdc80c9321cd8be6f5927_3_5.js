function(el, content, title, refresh, refreshFunc) {
            var myEl = $am(el);
            if (!myEl) {
                var newDiv = document.createElement("div");
                newDiv.id = el;
                newDiv.title = title;
                newDiv.innerHTML = content;
            } else {
                newDiv = myEl;
            }
            newDiv.className = "panel";
            var that = this;
            
            myEl = null;
            that.addDivAndScroll(newDiv, refresh, refreshFunc);
            newDiv = null;
            return;
        }