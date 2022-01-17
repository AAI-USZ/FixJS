function(a1,b1) {
		var a2 = right.x * a1.minX + right.y * a1.minY + right.z * a1.minZ;
		var b2 = right.x * b1.minX + right.y * b1.minY + right.z * b1.minZ;
		if(a2 < b2) {
			return -1;
		}
		else if(a2 == b2) return 0;
		return 1;
	}