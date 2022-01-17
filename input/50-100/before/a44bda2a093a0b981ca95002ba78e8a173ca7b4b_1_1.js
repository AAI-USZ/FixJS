function ExportMap()
{	// Wrapper for engine function
	log("Saving map...");
	
	// Get necessary data from map
	var data = g_Map.getMapData();
	
	// Add environment and camera settings
	g_Environment.Water.WaterBody.Height = SEA_LEVEL - 0.1;
	data.Environment = g_Environment;
	
	// Adjust default cam to roughly center of the map - useful for Atlas
	g_Camera.Position = {x: g_MapSettings.Size*2, y: g_MapSettings.Size*2, z: -g_MapSettings.Size*2};
	data.Camera = g_Camera;
	
	RMS.ExportMap(data);
}