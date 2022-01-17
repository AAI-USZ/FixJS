function()
        {
            grid = core.grids.siteGrid;
            selectedIndex = grid.focus.rowIndex;
            selectedItem = grid.getItem(selectedIndex);
            id = grid.store.getValue(selectedItem, 'site_idSite');
            tabTitle = grid.store.getValue(selectedItem, 'clientAd_addressName');

            this.showSiteTab(id, tabTitle);
        }