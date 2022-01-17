function() {

        var layer, element, content;

        this.layerListDiv.innerHTML = '';

        for (var i = 0; i <  this.map.layers.length; i++) {
            
            layer = this.map.layers[i];

            if(!(layer instanceof OpenLayers.Layer.Vector.RootContainer) &&
                 layer instanceof OpenLayers.Layer.Vector &&
                 !(layer instanceof OpenLayers.Editor.Layer.Snapping) &&
                 layer.name.search(/OpenLayers.Handler.+/) == -1) {

                content = document.createElement('div');

                element = document.createElement('input');
                element.type = 'checkbox';
                element.name = 'snappingLayer';
                element.id = 'Snapping.'+layer.id;
                element.value = 'true';
                if(this.snappingLayers.indexOf(layer) >= 0) {
                    element.checked = 'checked';
                    element.defaultChecked = 'selected'; // IE7 hack
                }
                content.appendChild(element);
                OpenLayers.Event.observe(element, 'click',
                    OpenLayers.Function.bind(this.setLayerSnapping, this, layer, element.checked));

                element = document.createElement('label');
                element.setAttribute('for', 'Snapping.'+layer.id);
                element.innerHTML = layer.name;
                OpenLayers.Event.observe(element, 'click', OpenLayers.Function.bind(function(event) {
                    // Allow to check checkbox by clicking its label even when drawing tools are active
                    OpenLayers.Event.stop(event, true);
                }, this));
                content.appendChild(element);

                this.layerListDiv.appendChild(content);
            }
        }
    }