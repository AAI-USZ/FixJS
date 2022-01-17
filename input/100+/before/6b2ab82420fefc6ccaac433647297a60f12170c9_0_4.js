function(width, height, zoomify_url, annotations_url, control_points_url, editable, user_id) {
  
  /* Callbacks for added / removed features */
  function featureSelected(evt) {
    var class_name = evt.feature.geometry.CLASS_NAME;
    if (!evt.feature.tooltip) {
      if (class_name == "OpenLayers.Geometry.Point") {
        evt.feature.tooltip = new MapHub.ControlPointTooltip(evt.feature.control_point, self.user_id);
      } else {
        evt.feature.tooltip = new MapHub.AnnotationTooltip(evt.feature.annotation, self.user_id);
      }
      self.tooltips.push(evt.feature.tooltip);
    }
    // get the screen coordinates
    var lonlat = evt.feature.geometry.getBounds().getCenterLonLat();
    var coords = this.map.getPixelFromLonLat(lonlat);
    evt.feature.tooltip.show(coords.x, coords.y);
  }
  
  function featureUnselected(evt) {
    evt.feature.tooltip.hide();
  }
  
  // This function is called when a feature was added to the Edit layer
  function featureAdded(evt) {
    
    // deactivate keyboard shortcuts
    self.keyboard_shortcuts.deactivate();
    
    // hide all tooltips
    for (var i in self.tooltips) {
      self.tooltips[i].hide();
    }
    
    // is this a Control Point or an Annotation?
    var class_name = evt.feature.geometry.CLASS_NAME;
    if (class_name == "OpenLayers.Geometry.Point") {
      controlPointAdded(evt);
    } else {
      annotationAdded(evt);
    }
  }
  
  // This function is called when an annotation was drawn
  function annotationAdded(evt) {    
    var wkt_data = evt.feature.geometry.toString();
    
    // reinitialize title and body, and copy WKT data as well as bounds
    $("#annotation_body").attr("value", "Add your annotation here!");
    $("#annotation_wkt_data").attr("value", wkt_data);
    
    $("#annotation_boundary_attributes_ne_x").attr("value", evt.feature.geometry.bounds.right);
    $("#annotation_boundary_attributes_ne_y").attr("value", evt.feature.geometry.bounds.top);
    $("#annotation_boundary_attributes_sw_x").attr("value", evt.feature.geometry.bounds.left);
    $("#annotation_boundary_attributes_sw_y").attr("value", evt.feature.geometry.bounds.bottom);
    
    // clear the existing tags
    $("#modal-annotation-tags").empty();
    $("#tagging-help").hide();
    $("#no-tags").show();
    
    // show the popup
    $("#modal-annotation").modal();
    $("#annotation_body").focus();
    $("#annotation_body").select();
  }
  
  function controlPointAdded(evt) {
    var wkt_data = evt.feature.geometry.toString();
    
    // set x/y in form
    $("#control_point_wkt_data").attr("value", wkt_data);
    $("#control_point_x").attr("value", evt.feature.geometry.x);
    $("#control_point_y").attr("value", evt.feature.geometry.y);
    
    // reset the place search box and slide up panel
    $("#place-search").attr("value", "");
    $("#modal-control-point").modal();
    $("#place-search").focus();
  }
  
  /* ============================================================================== */
  
  this.zoomify_width  = width;        // pixel width ...
  this.zoomify_height = height;       // ... and height of map
  this.zoomify_url    = zoomify_url;  // remote zoomify tileset
  
  this.annotations_url          = annotations_url;      // JSON request URL for annotations
  this.control_points_url       = control_points_url;   // JSON request URL for control points
  this.editable                 = editable;             // whether to show the control panel
  this.user_id                  = user_id;              // the currently logged in user ID
  this.features_annotations     = [];   // all annotation features
  this.features_control_points  = [];   // all control point features
  this.annotations              = [];   // all annotations on this map
  this.control_points           = [];   // all control points on this map
  this.tooltips                 = [];   // all tooltips on this map
  
  // ================================================================================
  
  var annotationStyleMap = new OpenLayers.StyleMap({
    'default': new OpenLayers.Style({
      'strokeColor': "#cc4400",
      'fillOpacity': "0.4",
      'fillColor': "#cc4400"
    }),
    'select': new OpenLayers.Style({
      'strokeColor': "#ff0000",
    }),
    'temporary': new OpenLayers.Style({
      'strokeColor': "#005580",
      'fillColor': "#00A9FF",
      'fillOpacity': "0.4",
    })
  });
  
  var controlPointStyleMap = new OpenLayers.StyleMap({
    'default': new OpenLayers.Style({
      'externalGraphic': "/assets/openlayers/pin.png",
      'graphicWidth': '15',
      'graphicWidth': '25',
      'graphicXOffset': -13,
      'graphicYOffset': -25
    }),
    'select': new OpenLayers.Style({
      'externalGraphic': "/assets/openlayers/pin.png",
      'graphicWidth': '15',
      'graphicWidth': '25',
      'graphicXOffset': -13,
      'graphicYOffset': -25
    }),
    'temporary': new OpenLayers.Style({
      'externalGraphic': "/assets/openlayers/pin.png",
      'graphicWidth': '15',
      'graphicWidth': '25',
      'graphicXOffset': -13,
      'graphicYOffset': -25
    })
  });
  
  // ================================================================================
  
  /* The zoomify layer */
  this.baseLayer = new OpenLayers.Layer.Zoomify(
    "Zoomify", 
    this.zoomify_url,
    new OpenLayers.Size( this.zoomify_width, this.zoomify_height ),
    { displayInLayerSwitcher: false }
  );

  /* The editing controls layer */
  this.editLayer = new OpenLayers.Layer.Vector(
    "Editable", 
    { styleMap: annotationStyleMap, displayInLayerSwitcher: false }
  );
  this.editLayer.events.register("featureadded", this.editLayer, featureAdded);
  
  this.controlPointEditLayer = new OpenLayers.Layer.Vector( 
    "Control Point Editable", 
    { styleMap: controlPointStyleMap, displayInLayerSwitcher: false }
  );
  this.controlPointEditLayer.events.register("featureadded", this.controlPointEditLayer, featureAdded);

  /* The annotation layer */
  this.annotationLayer = new OpenLayers.Layer.Vector(
    "Annotations", 
    { styleMap: annotationStyleMap }
  );
  
  /* The control points layer */
  this.controlPointsLayer = new OpenLayers.Layer.Vector( 
    "Control Points", 
    { styleMap: controlPointStyleMap }
  );
  

  /* Display options */
  var bounds = new OpenLayers.Bounds(0, 0, this.zoomify_width, this.zoomify_height)
  var options = {
      controls: [], 
      maxExtent: bounds,
      restrictedExtent: bounds,
      maxResolution: Math.pow(2, this.baseLayer.numberOfTiers-1),
      numZoomLevels: this.baseLayer.numberOfTiers,
      units: 'pixels'
  };

  this.map = new OpenLayers.Map("viewer", options);

  // add all layers to the map
  this.map.addLayer(this.baseLayer);
  this.map.addLayer(this.editLayer);
  this.map.addLayer(this.controlPointEditLayer);
  this.map.addLayer(this.annotationLayer);
  this.map.addLayer(this.controlPointsLayer);


  // remotely load already existing annotations and control points via JSON
  this.remoteLoadAnnotations();
  this.remoteLoadControlPoints();

  // add autocomplete
  this.initAutoComplete();

  // MouseDefaults is deprecated, see: http://trac.osgeo.org/openlayers/wiki/Control/MouseDefaults
  this.map.addControl(new OpenLayers.Control.Navigation());
  this.map.addControl(new OpenLayers.Control.MousePosition());
  this.map.addControl(new OpenLayers.Control.PanZoomBar());
  // Removed keyboard navigation for the time being, see issue #42
  this.keyboard_shortcuts = new OpenLayers.Control.KeyboardDefaults();
  this.map.addControl(this.keyboard_shortcuts);
  
  this.map.addControl(new OpenLayers.Control.LayerSwitcher(
    {'div':OpenLayers.Util.getElement('layerswitcher')})
    );
  
  // ================================================================================

  var select = new OpenLayers.Control.SelectFeature(
    [this.annotationLayer, this.controlPointsLayer], { 
      hover: true,
      renderIntent: "temporary"
      }
  );
  this.map.addControl(select);
  select.activate();
  
  this.annotationLayer.events.on({
    "featureselected": featureSelected,
    "featureunselected": featureUnselected
  });
  
  this.controlPointsLayer.events.on({
    "featureselected": featureSelected,
    "featureunselected": featureUnselected
  });
  
  
  // ================================================================================
  
  /* Allow creation of features */
  // http://stackoverflow.com/questions/10572005/
  if (editable) {
    this.drawControls = {
        point: new OpenLayers.Control.DrawFeature(this.controlPointEditLayer,
            OpenLayers.Handler.Point),
        line: new OpenLayers.Control.DrawFeature(this.editLayer,
            OpenLayers.Handler.Path),
        polygon: new OpenLayers.Control.DrawFeature(this.editLayer,
            OpenLayers.Handler.Polygon),
        box: new OpenLayers.Control.DrawFeature(this.editLayer,
            OpenLayers.Handler.RegularPolygon, {
                handlerOptions: {
                    sides: 4,
                    irregular: true
                }
            }
        )
    };
    
    // add controls to map
    for(var key in this.drawControls) {
        this.map.addControl(this.drawControls[key]);
    }
    
    // hide the types for an annotation
    $("#control-toggle-annotation-types").hide();
    $("#control-toggle-annotation").click(function() {
      $("#control-toggle-annotation-types").slideDown();
    });
    $("#control-toggle-control-point, #control-toggle-navigate").click(function(){
      $("#control-toggle-annotation-types").slideUp();
    });
    
    // check for toggled types
    var self=this;
    $("#control-toggle button").click(function(){
      for(key in self.drawControls) {
          var control = self.drawControls[key];
          if(this.value == key) {
              control.activate();
          } else {
              control.deactivate();
          }
      }      
    });
    
  }
  
  // ================================================================================
  
  this.map.setBaseLayer(this.baseLayer);
  this.map.zoomToMaxExtent();
  
}