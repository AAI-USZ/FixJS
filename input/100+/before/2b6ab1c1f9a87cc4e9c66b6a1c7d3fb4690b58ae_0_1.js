function()
        {
            grid = core.grids.clientGrid;
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'client_idClient');
            tabTitle = grid.store.getValue(selectedItem, 'client_name');

             bba.openTab({
                tabId : 'client' + id,
                title : (tabTitle) ? tabTitle : 'Client',
                url : './client/edit-client',

                content : {
                    type : 'details',
                    client_idClient : id
                }
            });
        }