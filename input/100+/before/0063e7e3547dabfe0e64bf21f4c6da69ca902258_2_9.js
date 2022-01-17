function(){
                var sortSelection = $(this).val();
                if (sortSelection === "desc") {
                    collectionviewer.sortOrder = "desc";
                    $.bbq.pushState({"so": "desc"});
                } else if (sortSelection === "asc") {
                    collectionviewer.sortOrder = "asc";
                    $.bbq.pushState({"so": "asc"});
                } else {
                    collectionviewer.sortOrder = "modified";
                    $.bbq.pushState({"so": "modified"});
                }
            }