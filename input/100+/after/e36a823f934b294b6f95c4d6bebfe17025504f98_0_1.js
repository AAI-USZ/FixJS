function (that) {
        var styles = that.options.styles;
        
        var displayModeWrapper = fluid.inlineEdit.setupDisplayModeContainer(styles);
        displayModeContainer = that.viewEl.wrap(displayModeWrapper).parent();
        
        that.textEditButton = fluid.inlineEdit.setupTextEditButton(that);
        displayModeContainer.append(that.textEditButton);
        
        fluid.inlineEdit.bindEventHandlers(that, displayModeContainer);

        return displayModeContainer;
    }