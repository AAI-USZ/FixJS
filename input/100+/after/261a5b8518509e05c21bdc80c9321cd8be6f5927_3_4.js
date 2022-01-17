function(id, content) {
            var el = $am(id);
            if (!el)
                return;
            
            var newDiv = document.createElement("div");
            newDiv.innerHTML = content;
            if($(newDiv).children('.panel') && $(newDiv).children('.panel').length > 0) newDiv = $(newDiv).children('.panel').get();
                
             
            
            if (el.getAttribute("js-scrolling") && el.getAttribute("js-scrolling").toLowerCase() == "yes"){
                $.cleanUpContent(el.childNodes[0], false, true);
                el.childNodes[0].innerHTML = content;
            }
            else{
                $.cleanUpContent(el, false, true);
                el.innerHTML = content;
            }
                
            if($(newDiv).title) el.title = $(newDiv).title;
        }