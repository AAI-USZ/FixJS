function() {
      var feature, layerWKTString, newVetData, newVetPolygon, newVetPolygonFeatures, newVetPolygonGeoms, speciesId, url, vetDataAsJSONString, _i, _len;
      consolelog("Processing create new vetting");
      newVetPolygonFeatures = this.vectorLayer.features;
      newVetPolygonGeoms = [];
      for (_i = 0, _len = newVetPolygonFeatures.length; _i < _len; _i++) {
        feature = newVetPolygonFeatures[_i];
        newVetPolygonGeoms.push(feature.geometry);
      }
      newVetPolygon = new OpenLayers.Geometry.MultiPolygon(newVetPolygonGeoms);
      consolelog("WKT logs:");
      consolelog("polygon", newVetPolygon);
      layerWKTString = this.wkt.extractGeometry(newVetPolygon);
      consolelog("layer string", layerWKTString);
      speciesId = Edgar.mapdata.species.id;
      newVetData = {
        area: layerWKTString,
        species_id: speciesId,
        comment: $("#vetcomment").val(),
        classification: $("#vetclassification").val()
      };
      consolelog("Post Data", newVetData);
      vetDataAsJSONString = JSON.stringify(newVetData);
      consolelog("Post Data as JSON", vetDataAsJSONString);
      url = Edgar.baseUrl + "species/insert_vetting/" + speciesId + ".json";
      $.post(url, vetDataAsJSONString, function(data, textStatus, jqXHR) {
        consolelog("New Vet Response", data, textStatus, jqXHR);
        return alert("New Vet Response: " + data);
      }, 'json');
      return true;
    }