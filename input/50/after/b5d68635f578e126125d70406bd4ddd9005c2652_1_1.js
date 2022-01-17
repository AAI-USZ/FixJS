function() {
                var record = getSelectedLayerRecord();
                if (record) {
                    this.removeFromSelectControl(record);
                    this.mapPanel.layers.remove(record, true);
                    removeLayerAction.disable();
                }
            }