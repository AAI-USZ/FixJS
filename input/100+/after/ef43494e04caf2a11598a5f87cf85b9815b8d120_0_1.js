function () {
    // create a panel containing the preview and other
    // context-sensitive items
    var previewPanel = Ext.create('Ext.panel.Panel', {
        id: 'previewpanel',
        title: 'Voorbeeld',
        //collapsed: true,
        height: 190,
        html: '<div id="kml-preview-container"><img id="kml-preview" src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D" alt="preview" width="200" height="150" /></div>'
    });

    // build a model for tree nodes containing some extra kml data
    Ext.define('KmlResourceNode', {
        extend: 'Ext.data.Model',
        fields: ['kml_id', 'text', 'description', 'kml_url', 'slug', 'preview_image_url']
    });
    Ext.data.NodeInterface.decorate(KmlResourceNode);

    // create a store for adapting the json output
    this.treeStore = Ext.create('Ext.data.TreeStore', {
        listeners: {
            single: true,
            load: function (thisStore, rootNode, records, successful, eOpts){
                var categories = thisStore.proxy.reader.rawData.categories;
                categories.forEach(function (category) {
                    var categoryNode = rootNode.appendChild({
                        text: category.name,
                        expanded: true,
                        leaf: false
                    });
                    category.kml_resources.forEach(function (k) {
                        var krn = new KmlResourceNode({
                            kml_id: k.id,
                            text: k.name,
                            description: k.description,
                            leaf: true,
                            checked: false,
                            kml_url: k.kml_url,
                            slug: k.slug,
                            preview_image_url: k.preview_image_url
                        });
                        categoryNode.appendChild(krn);
                    });
                });
            }
        },
        proxy: {
            type: 'ajax',
            url: '/kml/api_drf/?format=json',
            reader: {
                type: 'json'
            }
        }
    });

    var contextMenu = new Ext.menu.Menu({
        animCollapse: false,
        items: [
            {
                text: 'Zoom',
                iconCls: 'icon-zoom-in',
                handler: function (thisItem, event) {
                    var id = thisItem.parentMenu.node.get('kml_id');
                    var kmlFile = kfc.get(id);
                    if (kmlFile)
                        kmlFile.zoomToExtent();
                }
            },
        ]
    });

    // create the tree panel (and view)
    this.treePanel = Ext.create('Ext.tree.Panel', {
        title: 'Kaartlagen',
        store: this.treeStore,
        rootVisible: false,
        plain: false,
        multiSelect: false,
        animate: false,
        useArrows: true,
        lines: false,
        stateful: false,
        border: false,
        listeners: {
            itemclick: function (thisView, node, item, index, event, eOpts) {
                if (!node.isLeaf()) {
                    // user clicked on a category, collapse / expand it
                    if (node.isExpanded()) {
                        node.collapse();
                    }
                    else {
                        node.expand();
                    }
                }
                else {
                    if (node instanceof KmlResourceNode) {
                        // user clicked on a 'leaf' node, set the checkbox
                        var checked = !(node.get('checked'));
                        node.set('checked', checked);
                        // enable jarkus panel if use activated that
                        if (node.get('slug') === 'jarkus') {
                            kvu.setJarkusPanelEnabled(checked);
                        }
                        kfc.fireUpdate();
                    }
                }
            },
            // checkchange: function (node, checked, eOpts) {
            // },
            itemmouseenter: function (thisView, node, item, index, event, eOpts) {
                if (node instanceof KmlResourceNode) {
                    kvu.showPreviewImage(node.get('preview_image_url'));
                }
            },
            itemmouseleave: function (thisView, node, item, index, event, eOpts) {
                if (node instanceof KmlResourceNode) {
                    kvu.hidePreviewImage();
                }
            },
            /*
            mouseenter: {
                element: 'el',
                fn: function (thisView, event, eOpts) {
                    previewPanel.expand();
                }
            },
            mouseleave: {
                element: 'el',
                fn: function (thisView, event, eOpts) {
                    previewPanel.collapse();
                }
            },
            */
            itemcontextmenu: function (thisView, node, item, index, event) {
                if (node instanceof KmlResourceNode) {
                    contextMenu.node = node;
                    contextMenu.showAt(event.getXY());
                    event.stopEvent();
                }
            }
        }
    });

    // create the Jarkus controls
    this.initJarkusPanel();

    // create the left accordion
    this.accordion = Ext.create('Ext.container.Container', {
        title: 'Accordion Layout',
        defaults: {
            // applied to each contained panel
            bodyStyle: 'padding:5px'
        },
        disabled: true,
        layout: {
            type: 'accordion',
            animate: false,
            multi: true,
            shrinkToFit: false
        },
        items: [
            this.treePanel,
            this.jarkusPanel,
            previewPanel
        ],
        renderTo: Ext.get('ext-left-controls')
    });

    // create a slider for controlling the play speed
    var playRate = buildSlider({
        fieldLabel: 'Afspeelsnelheid',
        width: 300,
        minValue: 0.5,
        maxValue: 10.0,
        value: 5.0,
        decimalPrecision: 1,
        tipText: function (thumb) {
            return Ext.String.format('{0} jaar per seconde', thumb.value);
        },
        logarithmic: true,
        logarithmicOnChange: function (newValue) {
            tsc.setRate(newValue);
        },
        renderTo: Ext.get('ext-play-rate-slider')
    });
}