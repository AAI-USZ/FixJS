function (map_data) {

        //$(window).unload($.mapster.unload);

        // create graphics functions for canvas and vml browsers. usage:

        // 1) init with map_data, 2) call begin with canvas to be used (these are separate b/c may not require canvas to be specified

        // 3) call add_shape_to for each shape or mask, 4) call render() to finish



        var me = this;

        me.active = false;

        me.canvas = null;

        me.width = 0;

        me.height = 0;

        me.shapes = [];

        me.masks = [];

        me.map_data = map_data;

    }