function () {
            if (!that.options.selectableSelector) {
                fluid.fail("Cannot refresh selectable context which was not initialised by a selector");
            }
            that.selectables = container.find(options.selectableSelector);
            that.selectablesUpdated();
        }