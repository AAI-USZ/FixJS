function() {
        var map = new maphub.Map(parameters);
        map.render(document.getElementById('overlay_viewer'));
        map_gmap = map;
        annotations_url_gmap = parameters.annotations_url;
        makeGoogleAnnotations(map_gmap, annotations_url_gmap);
      }