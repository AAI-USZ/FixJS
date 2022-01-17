function()

    {

        this.callParent();

        

        // Fetch viewport.

        this.viewport = this.viewer.getViewport();

        

        // Watch for page changes.

        this.viewer.getEventDispatcher().bind('pagechange', this, this.onPageChange);

        

        // Watch for viewport changes.

        this.viewer.getViewportEventDispatcher().bind('change', this, this.onViewportChange);

        

        // Hide or show first rectangles at load of thumbnail.

        var _this = this;

        this.on('viewready',

            function()

            {

                setTimeout(function()
                {
                    _this.onPageChange();
                }, 100);

            });
        
        this.getEl().addListener("scroll", function()
        {
            this.onScroll();
        }, this);

    }