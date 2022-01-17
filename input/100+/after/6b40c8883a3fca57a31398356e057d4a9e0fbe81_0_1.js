function (selectedOption) {
        if (!this.feedDialog) {
            this.feedDialog = new gxp.FeedSourceDialog({
                title:"Add a GeoRSS Feed",
                closeAction:"hide",
                target:this,
                listeners:{
                    "feed-added":function (ptype, config) {

                        var sourceConfig = {"config":{"ptype":ptype}};
                        if (config.url) {
                            sourceConfig.config["url"] = config.url;
                        }
                        var source = this.addLayerSource(sourceConfig);
                        config.source = source.id;
                        var feedRecord = source.createLayerRecord(config);


                        this.mapPanel.layers.add([feedRecord]);
                        this.addCategoryFolder(feedRecord.get("group"), "true");
                        this.reorderNodes(feedRecord.getLayer());
                        this.treeRoot.findDescendant("layer", feedRecord.getLayer()).select();
                        this.selectControl.activate();
                    }, scope:this
                }, scope:this
            });
        }
        this.feedDialog.show();
        this.feedDialog.alignTo(document, 't-t');
        if (selectedOption) {
            this.feedDialog.sourceTypeRadioList.setValue(selectedOption);
        }
    }