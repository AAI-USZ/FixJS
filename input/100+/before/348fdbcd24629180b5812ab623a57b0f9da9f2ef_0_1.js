function() {
        this.indexToAdd = [];
        this.themes = this.themes || {};

        // fill displaynames one time for everybody
        function fillDisplayNames(nodes) {
            Ext.each(nodes, function(node) {
                node.displayName = OpenLayers.i18n(node.name);
                if (node.children) {
                    fillDisplayNames(node.children);
                }
            });
        }
        fillDisplayNames(this.themes.local);
        if (this.themes.external) {
            fillDisplayNames(this.themes.external);
        }

        this.root = {
            nodeType: 'async',
            children: [],
            expanded: true
        };

        this.actionsPlugin = new GeoExt.plugins.TreeNodeActions({
            listeners: {
                action: this.onAction,
                scope: this
            }
        });
        this.plugins = [
            this.actionsPlugin,
            new GeoExt.plugins.TreeNodeComponent(),
            new cgxp.tree.TreeNodeComponent({
                divCls: "legend-component",
                configKey: "legend"
            }),
            new cgxp.tree.TreeNodeLoading()
        ];
        var layerNodeUI = Ext.extend(cgxp.tree.TreeNodeTriStateUI, new GeoExt.tree.TreeNodeUIEventMixin());
        this.loader = new Ext.tree.TreeLoader({
            uiProviders: {
                layer: layerNodeUI,
                'default': cgxp.tree.TreeNodeTriStateUI
            }
        });
        cgxp.tree.LayerTree.superclass.initComponent.call(this, arguments);
        this.on({
            "beforeexpandnode": function(node) {
                node.eachChild(this.checkVisibility);
            },
            scope: this
        });
        this.getSelectionModel().on({
            "beforeselect": function() {
                return false;
            }
        });

        this.addEvents(
            /** private: event[addgroup]
             *  Fires after a theme is added.
             */
            "addgroup",

            /** private: event[removegroup]
             *  Fires after a theme is removed.
             */
            "removegroup",

            /** private: event[layervisibilitychange]
             *  Fires after a checkbox state changes
             */
            "layervisibilitychange",

            /** private: event[themeopacitychange]
             *  Fires after the theme opacity changes.
             */
            "themeopacitychange",

            /** private: event[ordergroup]
             *  Fires after the themes order is changed.
             */
            "ordergroup"
        );
        this.on('checkchange', function(node, checked) {
            this.fireEvent("layervisibilitychange");
            if (!this.changing) {
                this.changing = true;
                node.cascade(function(node){
                    node.getUI().toggleCheck(checked);
                });
                node.bubble(function(node){
                    if (node.parentNode) {
                        node.getUI().updateCheck();
                    }
                });
                this.changing = false;
            }
        }, this);
        this.changing = false;

        this.on('click', function(node) {
            node.getUI().toggleCheck(!node.getUI().isChecked());
        });

        this.mapPanel.map.events.on({
            'zoomend': function() {
                this.getRootNode().cascade(this.checkInRange);
            },
            scope: this
        });

        this.on({
            "expandnode": function(node) {
                node.eachChild(this.checkInRange);
            }
        });
    }