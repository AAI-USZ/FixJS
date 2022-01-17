function( bbox, _ignoreGeo /* Internal Use Only */ ) {
      // adaptation of Polygonizer class in JTS for use with bboxes
      var wasGeodetic = false;
      if ( !_ignoreGeo && $.geo.proj && this._isGeodetic( bbox ) ) {
        wasGeodetic = true;
        bbox = $.geo.proj.fromGeodetic(bbox);
      }

      var polygon = {
        type: "Polygon",
        coordinates: [ [
          [ bbox[ 0 ], bbox[ 1 ] ],
          [ bbox[ 0 ], bbox[ 3 ] ],
          [ bbox[ 2 ], bbox[ 3 ] ],
          [ bbox[ 2 ], bbox[ 1 ] ],
          [ bbox[ 0 ], bbox[ 1 ] ]
        ] ]
      };

      if ( wasGeodetic ) {
        polygon.coordinates = $.geo.proj.toGeodetic( polygon.coordinates );
      }

      return polygon;
    }