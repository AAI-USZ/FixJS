function(manager)
    {
        that.manager = manager; 
        // getting canvas, force, containers
        manager.loadEnvironment(that);

        that.selector = that.canvas.select('#' + selectorGroupId);
        that.buttons.rotate = that.selector.select('#buttonRotate');
        that.buttons.rotate.on('mousedown', that.buttonRotatePress);
    }