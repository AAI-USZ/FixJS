function (that) {
        var styles = that.options.styles;
        
        var displayModeWrapper = fluid.inlineEdit.setupDisplayModeContainer(styles);
        var displayModeRenderer = that.viewEl.wrap(displayModeWrapper).parent();
        
        that.textEditButton = fluid.inlineEdit.setupTextEditButton(that);
        displayModeRenderer.append(that.textEditButton);
        
        // Add event handlers.
        fluid.inlineEdit.bindHoverHandlers(displayModeRenderer, styles.invitation);
        fluid.inlineEdit.bindMouseHandlers(that.viewEl, that.edit);
        fluid.inlineEdit.bindMouseHandlers(that.textEditButton, that.edit);
        fluid.inlineEdit.bindKeyboardHandlers(that.textEditButton, that.edit);
        fluid.inlineEdit.bindHighlightHandler(that.viewEl, displayModeRenderer, that);
        fluid.inlineEdit.bindHighlightHandler(that.textEditButton, displayModeRenderer, that);
        
        return displayModeRenderer;
    }