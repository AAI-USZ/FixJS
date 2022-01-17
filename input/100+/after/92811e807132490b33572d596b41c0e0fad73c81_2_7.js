function(options)
    {
        this.options = $.extend({}, PreviewDisplay.DEFAULT_OPTIONS, options || {});
        this.options.container = $(this.options.container).first();
        this.original_dim = { width: 0, height: 0 };

        this.stage = new Kinetic.Stage({
            width: this.options.width,
            height: this.options.height,
            container: this.options.container[0]
        });

        this.layer = new Kinetic.Layer({ id: 'image-layer' });
        this.image = new Kinetic.Image({ id: 'preview-image' });

        this.viewport_rect = new Kinetic.Rect({
            id: 'viewport-rect',
            fill: "rgba(0, 0, 0, 0)",
            stroke: "black",
            strokeWidth: 0.5,
            draggable: true
        });

        var that = this;
        this.viewport_rect.on('dragmove', function()
        {
            that.options.onViewportChanged(
                that.translateDimensions(
                    that.getRelativeViewportBounds()
                )
            );
        });

        $(this.stage.getDOM()).bind('mousewheel', this.onViewportZoomed.bind(this));
       
        this.layer.add(this.image);
        this.layer.add(this.viewport_rect);
        this.stage.add(this.layer);
    }