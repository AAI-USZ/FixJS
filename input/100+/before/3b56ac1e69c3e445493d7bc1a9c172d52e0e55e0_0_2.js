function(e, _latitude, _longitude){
          $("#map-msg").modal('hide');
          mapDiv = $("#map-id").val();
          var el = $(mapDiv);
          el.empty();
          var lat = $(".map-lat-combo option:selected").val();
          if(_latitude !==undefined){
            lat = _latitude;
          }
          var lon = $(".map-long-combo option:selected").val();
          if(_longitude !== undefined){
            lon = _longitude;
          }
          var map = new recline.View.Map({
              model: datasetCollection.models[0],
              state: {
                lonField: lon,
                latField: lat,
              }
          });
          this._addProvenance({ id: $(mapDiv).attr("id"), visType: 'map', source: source, lat: lat, lon: lon});
          el.append(map.el);
          el.prepend('<div style="display:inline-block;"><button type="button" class="map-button btn-warning btn btn-small menu-button export-dialog"><i class="icon-share"></i> Share this visualization</button><span class="provenance"></span></div>');          
          map.redraw();
          $('body,html').animate({
              scrollTop: el.offset().top
          }, 800);
        }