function(config) {
        var record;


        var layer = new OpenLayers.Layer.Vector(config.title, {
            projection: "projection" in config ? config.projection : "EPSG:4326",
            visibility: "visibility" in config ? config.visibility : true,
            strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
            protocol: new OpenLayers.Protocol.HTTP({
                url: config.url,
                params: config.params,
                format: this.getFormat(config)
            }),
            styleMap: this.getStyleMap(config)
        });

        this.configureInfoPopup(layer);

        // create a layer record for this layer
        var Record = GeoExt.data.LayerRecord.create([
            {name: "title", type: "string"},
            {name: "source", type: "string"},
            {name: "group", type: "string"},
            {name: "fixed", type: "boolean"},
            {name: "selected", type: "boolean"},
            {name: "visibility", type: "boolean"},
            {name: "rssFormat", type: "string"},
            {name: "defaultStyle"},
            {name: "selectStyle"},
            {name: "params"}
        ]);



        var data = {
            layer: layer,
            title: config.title,
            source: config.source,
            group: config.group,
            fixed: ("fixed" in config) ? config.fixed : false,
            selected: ("selected" in config) ? config.selected : false,
            params: ("params" in config) ? config.params : {},
            visibility: ("visibility" in config) ? config.visibility : false,
            rssFormat: ("rssFormat" in config) ? config.rssFormat : this.defaultFormat,
            defaultStyle: ("defaultStyle" in config) ? config.defaultStyle : {},
            selectStyle: ("selectStyle" in config) ? config.selectStyle : {}
        };

        if (this.target.selectControl == null) {
            this.target.selectControl = new OpenLayers.Control.SelectFeature([layer], {
                //hover:true,
                clickout: true,
                scope: this
            });

            this.target.mapPanel.map.addControl(this.target.selectControl);
            this.target.selectControl.activate();
        } else {
            this.target.selectControl.layers.push(layer);
        }




        record = new Record(data, layer.id);

        return record;

    }