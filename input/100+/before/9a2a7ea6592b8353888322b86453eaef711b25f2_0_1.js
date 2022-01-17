function() {
      var newVetPolygonFeatures;
      newVetPolygonFeatures = this.features;
      if (Edgar.mapdata.species === null) {
        alert("No species selected");
        return false;
      } else if (new_vet_polygon_features.length === 0) {
        alert("No polygons provided");
        $('#newvet_add_polygon_button').effect("highlight", {}, 5000);
        return false;
      } else if ($('#vetclassification').val() === '') {
        alert("No classification provided");
        $('#vetclassification').effect("highlight", {}, 5000);
        return false;
      } else {
        return true;
      }
    }