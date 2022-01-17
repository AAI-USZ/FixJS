function(el, content, title, refresh, refreshFunc) {
            var myEl = $am(el);
            if (!myEl) {
                var newDiv = document.createElement("div");
                newDiv.innerHTML = content;
                if($(newDiv).children('.panel') && $(newDiv).children('.panel').length > 0) newDiv = $(newDiv).children('.panel').get();
                
                if(!newDiv.title&&title) newDiv.title = title;
                var newId = (newDiv.id)? newDiv.id : el; //figure out the new id - either the id from the loaded div.panel or the crc32 hash
                newDiv.id = newId;
            } else {
                newDiv = myEl;
            }
            newDiv.className = "panel";
            var that = this;
            
            myEl = null;
            that.addDivAndScroll(newDiv, refresh, refreshFunc);
            newDiv = null;
            return newId;
        }