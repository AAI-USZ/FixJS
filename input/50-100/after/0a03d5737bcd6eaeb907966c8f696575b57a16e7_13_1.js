function (that) {
        if (hasRepeatableSubgroup(that.options.components)) {
            that.container.addClass(that.options.styles.withSubgroup);
        }
        if (isGroup(that.options.repeatTree)) {
            that.container.addClass(that.options.styles.repeatableGroup);
        }
    }