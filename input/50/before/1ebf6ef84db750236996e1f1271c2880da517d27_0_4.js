function(e){
                var selected = $(this).is('.selected');
                var id = e.target.id;
                draft.gridOptions[id]=selected;
                refreshBG();
                refreshFG();
            }