function(wallIdx){

		var wall = walls.pts[wallIdx];

		var numUVs = wall.length-1

		var wallUVs = new Array(numUVs);

		for (var ptIdx=0; ptIdx<numUVs; ptIdx++){

			var ptA = wall[ptIdx];

			var ptB = wall[ptIdx+1];

			wallUVs[ptIdx] = V(ptB.x-ptA.x, ptB.y-ptA.y).UV();

		}

		return wallUVs;

	}