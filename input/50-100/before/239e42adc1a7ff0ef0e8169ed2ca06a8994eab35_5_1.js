function(activeModuleName) {
        for (var i in this.globalModuleNavigationButtons) {
            var button = this.globalModuleNavigationButtons[i];
            if (dijit.byId(button) && button.containerNode) {
                dojo.removeClass(button.containerNode, 'selected');
            }
        }

        var activeModuleButton = this.globalModuleNavigationButtons[activeModuleName];
        if (activeModuleButton) {
            dojo.addClass(activeModuleButton.containerNode, 'selected');
        }
    }