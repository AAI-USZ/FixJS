function repopulateList(){
        list.empty();
        var visibleCount = 0;
        var currentArray = [];
        for (var i = 0; i < items.length; i++){
           var item = items[i];
           if (item.visible){
               visibleCount++;
               if (visibleCount > currentPage * maxPerPage && visibleCount <= (currentPage + 1) * maxPerPage){
                    if (currentArray.length == 0)
                        currentArray = [item.facet];
                    else if (currentArray[0].shouldGroup(item.facet))
                        currentArray[currentArray.length] = item.facet;
                   else{
                        list.append("<div class=\"flx-listItem\">" + currentArray[0].getDetails(currentArray) + "</div>");
                        currentArray = [item.facet];
                    }
               }
           }
        }
        if (currentArray.length != 0)
            list.append("<div class=\"flx-listItem\">" + currentArray[0].getDetails(currentArray) + "</div>");
        if (list.children().length == 0)
            list.append("Sorry, no data to show.");
    }