function(config) {
        this.setDefaultAttrs({
            throttle: 80,
            clearBeforeDraw: true
        });

        this.nodeType = 'Layer';
        this.lastDrawTime = 0;
        this.beforeDrawFunc = undefined;
        this.afterDrawFunc = undefined;

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';

        // call super constructor
        this._super(config);
    }