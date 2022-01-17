function( o, element ){ 
        this.element = element;
        this.parent = null;
        this.upBtn = null;
        this.downBtn = null;
        this.handle = null;
        this.func = null;
        this.dim = null;
        this.options = {
            minHandleSize: 10,
            orientation: 'vertical',
            scrollDistance: 10, // Distance in pixels of each scroll
            showButtons: true,
            mouseholdDeadtime: 500, // Time to continue holding
            mouseholdTimeout: 10 // Mousehold timeout (ms)
        };

        // Init the scroller
        this.init( o );
    }