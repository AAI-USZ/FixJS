function(){
		var zGableBase = 3.55;

		var pointsNR = [[0.4,0,0],[0.25,0,0],[0.22,0.02,0],
						[0.2,0.05,0],[0.18,0.07,0],[0.1,0.1,0],[
						0.05,0.15,0],[0.1,0.2,0]];
		var points = rotatePoints(pointsNR,-PI/4,1);
		var points2 = rotatePoints(points,-PI/2,1);

		points = translatePoints(points,2,zGableBase);
		points = translatePoints(points,0,-3.85);
		points2 = translatePoints(points2,0,xGableBase-0.2+4.06);
		points2 = translatePoints(points2,2,zGableBase);
		var knots = makeKnots(points);
		var profile = NUBS(S0)(2)(knots)(points);
		var profile2 = NUBS(S0)(2)(knots)(points2);
		var corniceUp = BEZIER(S1)([profile,profile2]);
		corniceUp = MAP(corniceUp)(domain2d);
		corniceUp = T([0,1,2])([-0.06,10.3,3.05])(corniceUp);
		return corniceUp;
	}