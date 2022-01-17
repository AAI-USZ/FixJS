function () {
            return $("<div></div>", {
                "class": "select2-container",
                "style": "width: " + this.getContainerWidth()
            }).html([
                "    <a href='javascript:void(0)' class='select2-choice'><input type='text' class='select2-offscreen select2-focusser'/>",
                "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>",
                "   <div><b></b></div>" ,
                "</a>",
                "    <div class='select2-drop' style='display:none;'>" ,
                "   <div class='select2-search'>" ,
                "       <input type='text' autocomplete='off'/>" ,
                "   </div>" ,
                "   <ul class='select2-results'>" ,
                "   </ul>" ,
                "</div>"].join(""));
        }