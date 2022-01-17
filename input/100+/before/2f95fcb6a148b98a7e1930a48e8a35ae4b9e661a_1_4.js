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

	

	map.disableDblClickZoom();

	YMaps.Events.observe(map, map.Events.DblClick, setCoordValue);	

	if (type=="update") {	

	setCoordValue(map);

	center = new YMaps.GeoPoint($('#GibddHeads_lng').val(), $('#GibddHeads_lat').val());

	map.setCenter(center, zoom, context.YMaps.MapType.MAP);	

	}

}