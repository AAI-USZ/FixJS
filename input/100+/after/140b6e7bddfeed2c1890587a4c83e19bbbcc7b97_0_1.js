function(){
	
		OpenLayers.ProxyHost = this.proxyUrl;
		OpenLayers.Util.onImageLoadErrorColor = "transparent";
		OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
	
		var mapOptions = {
			controls: [],
			projection: new OpenLayers.Projection("EPSG:900913"),
			units: "m",
			maxResolution: 156543.0339,
			maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
			restrictedExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
			minZoomLevel: 1
		};
	
		InsetMap.map = new OpenLayers.Map('inset_map', mapOptions);
	
		InsetMap.map.addControl(new OpenLayers.Control.Navigation({
			title:'Drag to pan, double-click to zoom in'
		}));
	
		InsetMap.map.addControl(new OpenLayers.Control.PanZoom());
		
		/*InsetMap.map.addControl(new OpenLayers.Control.MousePosition({
			displayProjection: new OpenLayers.Projection("EPSG:4326"),
			numDigits: 4
		}));*/
		
		/*InsetMap.map.addControl(new OpenLayers.Control.LayerSwitcher({
			'ascending': false
		}));*/
		
		var gsat = new OpenLayers.Layer.Google(
			"Google Satellite",
			{
				type: G_SATELLITE_MAP,
				sphericalMercator: true,
				isBaseLayer: true
			}
		);
	
		InsetMap.map.addLayers([gsat]);
	
		InsetMap.map.zoomToExtent(new OpenLayers.Bounds(4370000, 290000, 14230000, 5670000));
		InsetMap.map.zoomIn();
		
	}