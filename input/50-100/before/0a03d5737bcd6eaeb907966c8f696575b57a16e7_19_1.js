function (that) {
        that.container.wrap("<div />");
        that.termListImplContainer = that.container.parent();
        that.termListSelector = "." + that.container.attr("class").split(" ").join(".");
    }