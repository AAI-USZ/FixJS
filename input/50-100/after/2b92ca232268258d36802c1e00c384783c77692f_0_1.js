function(viz, options) {
      this.viz = viz;
      this.config = $.merge({
        idSuffix: '-bkcanvas',
	levelDistance: options.CanvasStyles.levelDistance || viz.config.levelDistance || 100,
        numberOfCircles: 6,
        CanvasStyles: {},
        offset: 0
      }, options);
    }