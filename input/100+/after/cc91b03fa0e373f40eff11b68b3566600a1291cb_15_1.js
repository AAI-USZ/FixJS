function(filterTypes)
    {
        var panelNode = this.panelNode;

        Events.dispatch(this.fbListeners, "onFilterSet", [logTypes]);

        for (var type in logTypes)
        {
            // Different types of errors and warnings are combined for filtering
            if (filterTypes == "all" || filterTypes == "" || filterTypes.indexOf(type) != -1 ||
                (filterTypes.indexOf("error") != -1 && (type == "error" || type == "errorMessage")) ||
                (filterTypes.indexOf("warning") != -1 && (type == "warn" || type == "warningMessage")))
            {
                Css.removeClass(panelNode, "hideType-" + type);
            }
            else
            {
                Css.setClass(panelNode, "hideType-" + type);
            }
        }
    }