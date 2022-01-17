function (that) {
        that.container.wrap($("<div />").addClass(that.options.styles.termList));
        that.termListImplContainer = that.container.parent();
        that.termListSelector = "." + that.container.attr("class").split(" ").join(".");
    }