function (container, options) {
        var that = fluid.initView("cspace.util.togglable", container, options);

        that.locate("header").addClass(that.options.styles[that.options["default"]])
            .addClass(that.options.styles.header).fluid("tabbable");

        that.getNext = function (source) {
            var next = source.next(that.options.selectors.togglable);
            if (next.length > 0) {
                return next;
            }
            // Assume that the source is last in the block.
            return source.parent().next(that.options.selectors.togglable);
        };

        var toggle = function (source) {
            that.getNext(source).toggle();
            source.toggleClass(that.options.styles.expanded);
            source.toggleClass(that.options.styles.collapsed);
            return false;
        };

        // Need clean listners to cover the case when the markup was rendered.
        // Listeners from wiped markup retain and thus double.
        that.container.undelegate(that.options.selectors.header, "keyup");
        that.container.undelegate(that.options.selectors.header, "click");
        // Using fluid.activatable didn't work + need to delegate since the
        // markup can get re-rendered.
        that.container.delegate(that.options.selectors.header, "keyup", function (event) {
            var key = cspace.util.keyCode(event);
            if (key !== $.ui.keyCode.ENTER && key !== $.ui.keyCode.SPACE) {
                return;
            }
            return toggle($(this));
        });

        that.container.delegate(that.options.selectors.header, "click", function () {
            return toggle($(this));
        });

        return that;
    }