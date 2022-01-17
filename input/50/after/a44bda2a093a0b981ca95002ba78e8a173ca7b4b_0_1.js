function setWaterHeight(h)
{
	g_Environment.Water.WaterBody.Height = h;
	WATER_LEVEL_CHANGED = true;
}