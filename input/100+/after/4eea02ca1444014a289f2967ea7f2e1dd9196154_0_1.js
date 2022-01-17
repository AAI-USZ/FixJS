function(map) {
        for (var i = 0; i < map.controls.length; i++) { 
            if (map.controls[i] && map.controls[i].CLASS_NAME == 
        "olwidget.EditableLayerSwitcher") { 
                /* Temporary until issue #286 is fixed */
                if ( $.browser.msie && (parseInt($.browser.version, 10) >= 8) ) {
                    alert("At the moment, map editing doesn't work in IE 8 & 9. Please use Firefox or Chrome instead to edit maps.");
                }
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