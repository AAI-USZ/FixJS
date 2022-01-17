function(area)
{
	var length = area.points.length;
	var elevation = this.elevation;
	
	for (var i=0; i < length; i++)
	{
		var pt = area.points[i];
		
		for (var j=0; j < 4; j++)
		{
			if (g_Map.validT(pt.x + this.DX[j],pt.z + this.DZ[j]))
				g_Map.height[pt.x + this.DX[j]][pt.z + this.DZ[j]] = elevation;
		}
	}
}