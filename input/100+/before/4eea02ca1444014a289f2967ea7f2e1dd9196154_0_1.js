function(map) {
        for (var i = 0; i < map.controls.length; i++) { 
            if (map.controls[i] && map.controls[i].CLASS_NAME == 
        "olwidget.EditableLayerSwitcher") { 
                layer = map.vectorLayers[0];
                if (layer.controls) {
                    this._remove_unneeded_controls(layer);
                    map.controls[i].setEditing(layer);

                    this._set_modify_control(layer);
                    this._registerEvents(map, layer);
                }
                break; 
            } 
        }
    }