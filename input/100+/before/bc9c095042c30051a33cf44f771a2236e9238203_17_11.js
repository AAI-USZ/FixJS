function(up) {
            if ($(topnavSearchResultsContainer).find("li").length) {
                var currentIndex = 0,
                    next = 0;
                if ($(topnavSearchResultsContainer).find("li.selected").length) {
                    currentIndex = $(topnavSearchResultsContainer).find("li").index($(topnavSearchResultsContainer).find("li.selected")[0]);
                    next = up ? (currentIndex - 1 >= 0 ? currentIndex-1 : -1) : (currentIndex + 1 >= $(topnavSearchResultsContainer).find("li").length ? $(topnavSearchResultsContainer).find("li").length-1 : currentIndex +1);
                    $(topnavSearchResultsContainer).find("li.selected").removeClass("selected");
                }
                if (next !== 0 && next === currentIndex){
                    next = 0;
                } else if (next === -1){
                    next = $(topnavSearchResultsContainer).find("li").length - 1;
                }
                if (next !== -1) {
                    $(topnavSearchResultsContainer).find("li:eq(" + next + ")").addClass("selected");
                }
                return false;
            }
        }