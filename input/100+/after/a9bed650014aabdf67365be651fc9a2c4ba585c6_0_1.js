function(config) {
        this.panel = new Ext.Panel(Ext.apply({
            title: OpenLayers.i18n("querier"),
            layout: 'card',
            activeItem: 0,
            defaults: {
                border: false
            },
            items: [{
                html: " "
            }],
            listeners: {
                "expand": this.onPanelExpanded,
                "collapse": function() {
                    if (this.drawingLayer) {
                        this.drawingLayer.setVisibility(false);
                    }
                    this.events.fireEvent("queryclose");
                },
                scope: this
            },
            scope: this
        }, this.options));

        return cgxp.plugins.QueryBuilder.superclass.addOutput.call(this, this.panel);
    }