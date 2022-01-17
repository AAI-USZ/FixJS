function init_MAP_DzDvWLBsil(context, type) 

{

	if (!type) type="show";

	if (null == context)

		context = window;



	if (!context.YMaps)

		return;

	

	window.GLOBAL_arMapObjects['MAP_DzDvWLBsil'] = new context.YMaps.Map(context.document.getElementById("BX_YMAP_MAP_DzDvWLBsil"));

	var map = window.GLOBAL_arMapObjects['MAP_DzDvWLBsil'];

	

	map.bx_context = context;

	var zoom=10;

	if (YMaps.location) {

					center = new YMaps.GeoPoint(YMaps.location.longitude, YMaps.location.latitude);						

					if (YMaps.location.zoom) {

						zoom = YMaps.location.zoom;

					}				

					

				}else {

					center = new YMaps.GeoPoint(37.61763381958, 55.75578689575);					

				}

	// Установка для карты ее центра и масштаба

	map.setCenter(center, zoom, context.YMaps.MapType.MAP);			

	

	

				map.enableScrollZoom();

				map.enableDblClickZoom();

				map.enableDragging();

				map.disableHotKeys();

				map.disableRuler();

				map.addControl(new context.YMaps.ToolBar());

				map.addControl(new context.YMaps.Zoom());

				map.addControl(new context.YMaps.MiniMap());

				map.addControl(new context.YMaps.TypeControl());

				map.addControl(new context.YMaps.ScaleLine());

				if (window.BXWaitForMap_searchMAP_DzDvWLBsil)

		{

							window.BXWaitForMap_searchMAP_DzDvWLBsil(map);

					}

				if (window.BX_SetPlacemarks_MAP_DzDvWLBsil)

		{

							window.BX_SetPlacemarks_MAP_DzDvWLBsil(map);

					}

	

	if (type=="add" || type=="update") {

	map.disableDblClickZoom();	

	YMaps.Events.observe(map, map.Events.DblClick, setCoordValue);	

	}

	if (type=="update") {	

	setCoordValue(map);

	center = new YMaps.GeoPoint($('#GibddHeads_lng').val(), $('#GibddHeads_lat').val());

	map.setCenter(center, zoom, context.YMaps.MapType.MAP);	

	}

	if (type=="update_regional" || type=="update_regional_areaExtend" ){

	//polygon=setPolygon(map, new YMaps.GeoPoint(lat, lon));

	map.disableDblClickZoom();	

	/*YMaps.Events.observe(map, map.Events.DblClick, function(map, ev){		

		if (!polygons.length) {

			//setPolygon(map, new YMaps.GeoPoint(ev.getCoordPoint().getX(), ev.getCoordPoint().getY()));

			}

	});*/	

	if (!polygons.length && type=="update_regional_areaExtend") {

		if (startpoints.length){

			for (i in startpoints)

				addPolygon(map, i , startpoints[i]);

		}

		else polygons=setPolygon(map, new YMaps.GeoPoint(0, 0));		

		}

	}

	$('#newPolygon').click(function() {	

		var defaultpoints=[new YMaps.GeoPoint(map.getCenter().getX()-0.00,map.getCenter().getY()-0.06),

											  new YMaps.GeoPoint(map.getCenter().getX()-0.06,map.getCenter().getY()+0.00),

											  new YMaps.GeoPoint(map.getCenter().getX()+0.00,map.getCenter().getY()+0.06),

											  new YMaps.GeoPoint(map.getCenter().getX()+0.06,map.getCenter().getY()+0.00)];

		addPolygon(map, polygons.length , defaultpoints);

	return false;

	});	

	

	if (defbounds.length){

	bounds=new Array;

		for (i in defbounds)

			for (ii in defbounds[i])

				bounds.push(defbounds[i][ii]);		

		map.setBounds (new YMaps.GeoCollectionBounds(bounds));

	}

	$('#showAllRegions').click(function() {	

			for (objIndex in allregionPolygons){

				map.removeOverlay(allregionPolygons[objIndex]);

			}			

			YMaps.Regions.load("ru", function (state, response) {

				if (state == YMaps.State.SUCCESS) {

				

				  response.forEach(function (obj, objIndex, group) {

					 

				  obj.setOptions({

					highlightRegion: false

				  });

				 

				  var geoObjectOptions = {

					hasBalloon: true,

					hasHint: true,

					hintOptions: {

					   offset: new YMaps.Point(5, 5)

					}

				  }

						

				  var style = new YMaps.Style();

				  style.polygonStyle = new YMaps.PolygonStyle();

				  style.polygonStyle.fill = true;

				  style.polygonStyle.outline = true;

				  style.polygonStyle.strokeWidth = 3;

				  style.polygonStyle.strokeColor = "ffffff88";

				  style.polygonStyle.fillColor = "ff000055";

						

				  allregionPolygons[objIndex] = YMaps.Polygon.fromEncodedPoints(

					obj.metaDataProperty.encodedShapes[0].coords,

					obj.metaDataProperty.encodedShapes[0].levels,

					geoObjectOptions

				  );			

				

				  allregionPolygons[objIndex].name = obj.name;

				  allregionPolygons[objIndex].description = 'tratata ' + obj.name;

						

				  allregionPolygons[objIndex].setStyle(style);

				

				  map.addOverlay(allregionPolygons[objIndex]);

				  allregionPolygons[objIndex].startEditing();	

				  

				  $('#AllRegionsForm').show();

			  });

				

				

			  response.setStyle({

				polygonStyle : {

				  fillColor : "ffffff99",

				  strokeColor : "000000",

				  strokeWidth: 3

				},

				hasHint : false

			  });

			  

			} else {

			  alert("Во время выполнения запроса произошла ошибка: " + response.error.message)

			}

			

		});

	return false;	

	});

	

	return map;

}