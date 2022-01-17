function wpgmappity_build_data_container() {
  var empty_controls_object = {
    zoom : {
      active : false,
      style : '',
      position : ''
    },
    type : {
      active : false,
      style : '',
      position : ''
    },
    scale : {
      active : false,
      position : ''
    },
    street : {
      active : false,
      position : ''
    }
  };

  var routeContainer = {
    'active' : '0',
    'points' : [],
    'color' : '',
    'service' : new google.maps.DirectionsService(),
    'display' : new google.maps.DirectionsRenderer()
  };

  var data = {
    'version' : '0.6',
    'map_length': 450,
    'map_height': 300,
    'map_zoom' : 3,
    'center_lat' : '39.185575',
    'center_long' : '-96.575206',
    'markers' : [],
    'map_type' : 'normal',
    'alignment' : 'none',
    'scroll' : 'scroll',
    'controls' : empty_controls_object,
    'map_address' : '',
    'slider_object' : '',
    'promote' : '0',
    'route' : routeContainer,
    'listeners' : {
      'zoom' : {},
      'center' : {}
      }

    };
  return data;
}