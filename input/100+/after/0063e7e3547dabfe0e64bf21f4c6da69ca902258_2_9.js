function(){
                var sortSelection = $(this).val();
                var state = {};
                if (sortSelection === "desc") {
                    collectionviewer.sortOrder = "desc";
                    state[collectionviewer.tuidso] = 'desc';
                    $.bbq.pushState(state);
                } else if (sortSelection === "asc") {
                    collectionviewer.sortOrder = "asc";
                    state[collectionviewer.tuidso] = 'asc';
                    $.bbq.pushState(state);
                } else {
                    collectionviewer.sortOrder = "modified";
                    state[collectionviewer.tuidso] = 'modified';
                    $.bbq.pushState(state);
                }
            }