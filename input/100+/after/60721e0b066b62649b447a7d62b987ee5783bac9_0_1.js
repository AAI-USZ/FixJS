function MarketplaceView(id, options) {
        options.id = 'marketplace';
        StyledElements.Alternative.call(this, id, options);

        this.viewsByName = {};
        this.alternatives = new StyledElements.StyledAlternatives();
        this.alternatives.addEventListener('postTransition', function () {
            LayoutManagerFactory.getInstance().header.refresh();
        });
        this.appendChild(this.alternatives);
        this.generateViews();

        this.marketMenu = new StyledElements.PopupMenu();
        this.marketMenu.append(new Wirecloud.ui.MarketplaceViewMenuItems(this));
    }