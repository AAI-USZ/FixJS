function (p3,offset) {
		//an efficient hack to quickly add an offset to a 3D point
		return [p3[0]+offset[0], p3[1]+offset[1], p3[2]+offset[2]];
	}