function(options)
    {
        this.options = $.extend({}, Ichie.DEFAULT_OPTIONS, options || {});
        var that = this;

        this.preview_display = new PreviewDisplay();
        this.main_display = new MainDisplay();

        this.preview_display.init({
            container: this.options.preview_container,
            onViewportChanged: that.main_display.onViewportChanged.bind(that.main_display)
        });
        
        this.main_display.init({
            container: this.options.main_container,
            width: this.options.width,
            height: this.options.height,
            onViewportChanged: this.preview_display.onViewPortChanged.bind(this.preview_display),
            onSelectionChanged: this.options.onSelectionChanged
        });

        this.working_canvas = document.createElement("canvas");

        this.command_queue = new CommandQueue();
        this.command_queue.init();
    }