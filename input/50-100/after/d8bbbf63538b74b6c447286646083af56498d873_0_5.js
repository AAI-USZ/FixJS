function(config) {
        this.setDefaultAttrs({
            throttle: 80,
            clearBeforeDraw: true
        });

        this.nodeType = 'Layer';
        this.lastDrawTime = 0;
        this.beforeDrawFunc = undefined;
        this.afterDrawFunc = undefined;

        this.canvas = new Kinetic.Canvas();
        this.canvas.getElement().style.position = 'absolute';

        // call super constructor
        this._super(config);
    }