function(a,b) {
		var a2 = right.x * a.minX + right.y * a.minY + right.z * a.minZ;
		var b2 = right.x * b.minX + right.y * b.minY + right.z * b.minZ;
		if(a2 < b2) return -1; else if(a2 == b2) return 0;
		return 1;
	}