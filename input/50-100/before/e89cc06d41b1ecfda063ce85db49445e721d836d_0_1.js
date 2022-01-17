function(key, val) {
          annotation_type = val.wkt_data[0]; //P or L for POLYGON or LINESTRING
            var shape = getGoogleAnnotation(map["googleMap"], val.google_maps_annotation, 
            annotation_type, val.body);
            shape.setMap(map["googleMap"]);
            annotations_array.push(shape);
            console.log('testing');
          }