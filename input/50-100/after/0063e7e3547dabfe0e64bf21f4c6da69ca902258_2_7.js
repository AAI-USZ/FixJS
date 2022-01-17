function(){
                if(collectionviewer.listStyle === "carousel"){
                    $.bbq.pushState({"item": $(this).attr("data-item-id")});
                    fetchCollectionData = false;
                }
                if(initialload){
                    initialload = false;
                    handleHashChange();
                }
            }