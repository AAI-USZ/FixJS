function(MapType) {


      switch (MapType) {

        case 'Roadmap':
            this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            this.ClearMapType();
            this.ActualMapType[0] = true;
            this.MapCookie.put(MapType);
            break;
        case 'Hybrid':
            this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            this.ClearMapType();
            this.ActualMapType[1] = true;
            this.MapCookie.put(MapType);
            break;
        case 'Terrain':
            this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
            this.ClearMapType();
            this.ActualMapType[2] = true;
            this.MapCookie.put(MapType);
            break;
        case 'Satellite':
            this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
            this.ClearMapType();
            this.ActualMapType[3] = true;
            this.MapCookie.put(MapType);
            break;
        case 'do-traffic':
            this.Traffic();
        	break;
        case 'do-bike':
            this.Bike();
        	break;
        case 'do-weather':
            this.Weather();
        	break;
        case 'do-cloud':
            this.Cloud();
        	break;
        case 'do-night':
            this.Night();
        	break;
      }

	}