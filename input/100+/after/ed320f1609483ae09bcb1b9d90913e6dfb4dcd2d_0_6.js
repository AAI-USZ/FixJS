function(json)
    {
        var that = this;
        for (var i in json.features)
        {
            var shape = json.features[i];
            var paths = [];
            for (var j in shape.coordinates)
            {
                var xy = shape.coordinates[j];
                paths.push(new google.maps.LatLng(xy[0], xy[1]));
            }

            var polygon = new google.maps.Polygon({
                id: shape.properties.id,
                formula: shape.formula,
                paths: paths,
                strokeOpacity: 0.3,
                strokeWeight: 1,
                fillOpacity: 0.3,
                clickable: true,
                editable: false
            });

            that.polygons[polygon.id] = polygon;

            google.maps.event.addListener(polygon, 'mouseout', function()
            {
                this.setOptions({
                    editable: false
                });
                that.infoBubble.close();
            });
            google.maps.event.addListener(polygon, 'mouseover', function()
            {
                this.setOptions({
                    editable: true
                });
                that.infoBubble.setContent('<div class="phoneytext">' + (this.bubbleText) + '</div>');
                that.infoBubble.setPosition(getCenter(this));
                if ($.bbq.getState('type') == 'polygons')
                {
                    that.infoBubble.open(this.map);
                }
            });
            google.maps.event.addListener(polygon, 'click', function()
            {
                $('#data_save_form form').load('/region/saveData?id=' + this.id + '&metric=' + that.currentMetric,
                    function()
                    {
                        $('#data_save_form').modal('show');
                    });
            });
            var polygonSave = function(polygon)
            {
                return function(number, elem)
                {
                    polygon.setPath(this);
                    savePolygon(polygon);
                }
            };
            google.maps.event.addListener(polygon.getPath(), 'set_at', polygonSave(polygon));
            google.maps.event.addListener(polygon.getPath(), 'insert_at', polygonSave(polygon));
            polygon.setMap(this.map);
        }
    }