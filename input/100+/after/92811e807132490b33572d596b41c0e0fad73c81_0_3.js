function(options)
    {
        this.options = $.extend({}, MainDisplay.DEFAULT_OPTIONS, options || {});
        this.options.container = $(this.options.container).first();
        this.natural_dim = { width: 0, height: 0 };

        this.stage = new Kinetic.Stage({
            width: this.options.width,
            height: this.options.height,
            container: this.options.container[0]
        });

        this.layer = new Kinetic.Layer({ id: 'image-layer' });
        this.image = new Kinetic.Image({ id: 'preview-image', draggable: true });
        this.layer.add(this.image);
        this.stage.add(this.layer);

        var that = this;
        this.image_selection = new ImageAreaSelection();
        this.image_selection.init(this, {
            stage: this.stage,
            width: options.select_width || this.stage.getWidth(),
            height: options.select_height || this.stage.getHeight(),
            onSelectionChanged: function()
            {
                that.options.onSelectionChanged(
                    that.getCurrentSelection()
                );
            }
        });

        this.zoom_handler = this.onImageZoomed.bind(this);
        this.image.on('dragmove', function()
        {
            that.options.onViewportChanged(
                that.translateDimensions({ 
                    top: -that.image.getY(), 
                    right: (-that.image.getX() + that.stage.getWidth()), 
                    bottom: (-that.image.getY() + that.stage.getHeight()), 
                    left: -that.image.getX()
                })
            );

            that.options.onSelectionChanged(
                that.getCurrentSelection()
            );
        });
    }