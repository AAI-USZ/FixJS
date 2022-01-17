function () {
        if (!this.serverSide) {
            return old.call(this);
        }

        var node = this.srcNodeRef;

        node.removeAttribute("data-dojo-type");

        // Call down to _Widget.buildRendering() to get base classes assigned
        // TODO: change the baseClass assignment to _setBaseClassAttr
        //	this.inherited(arguments);
        _WidgetBase.prototype.buildRendering.call(this);

        // FIX ME: We don't want to descend into inner template widgets.
        // recurse through the node, looking for, and attaching to, our
        // attachment points and events, which should be defined on the template node.
        this._attachTemplateNodes(node, function(n,p){ return n.getAttribute(p); });

        this._beforeFillContent();		// hook for _WidgetsInTemplateMixin
    }