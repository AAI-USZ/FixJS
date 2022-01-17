function(){
		var garden = [];	
		var xGarden1 = wallX + 12/11*wallX;
		var floor1 = SIMPLEX_GRID([[xGarden1],[0.01],[xGarden1]]);
		garden.push(floor1);
		var grass1 = SIMPLEX_GRID([[-3/23*xGarden1,2/23*xGarden1,-13/23*xGarden1,2/23*xGarden1],[-0.01,0.01],[-2/23*xGarden1,6/23*xGarden1]]);
		grass1 = COLOR([0/255, 153/255, 0/255])(grass1);
		garden.push(grass1);
		var streets1 = SIMPLEX_GRID([[-xGarden1,4/23*xGarden1],[0.01],[-7/23*xGarden1,2/23*xGarden1,-5/23*xGarden1,2/23*xGarden1,-3/23*xGarden1,1/23*xGarden1]]);
		garden.push(streets1);
		var streets2 = SIMPLEX_GRID([[-27/23*xGarden1,2/23*xGarden1],[0.01],[36/23*xGarden1]]);
		streets2 = T([2])([-16/23*xGarden1])(streets2);
		garden.push(streets2);
		var grass2 = SIMPLEX_GRID([[-xGarden1,4/23*xGarden1],[-0.01,0.01],[7/23*xGarden1,-2/23*xGarden1,5/23*xGarden1,-2/23*xGarden1,3/23*xGarden1]]);
		grass2 = COLOR([0/255, 153/255, 0/255])(grass2);
		garden.push(grass2);
		var square1 = SIMPLEX_GRID([[2/23*xGarden1],[0.01],[16/23*xGarden1]]);
		square1 = T([2])([-16/23*xGarden1])(square1);
		garden.push(square1);
		var square2 = SIMPLEX_GRID([[5/23*xGarden1],[0.01],[18/23*xGarden1]]);
		square2 = T([0,2])([-5/23*xGarden1,-16/23*xGarden1])(square2);
		garden.push(square2);
		var streets3 = SIMPLEX_GRID([[-7/23*xGarden1,2/23*xGarden1,-5/23*xGarden1,2/23*xGarden1],[0.01],[11/23*xGarden1]]);
		streets3 = T([2])([-11/23*xGarden1])(streets3);
		garden.push(streets3);
		var grass3 = SIMPLEX_GRID([[-2/23*xGarden1,5/23*xGarden1,-9/23*xGarden1,11/23*xGarden1],[-0.01,0.01],[16/23*xGarden1]]);
		grass3 = COLOR([0/255, 153/255, 0/255])(grass3);
		grass3 = T([2])([-16/23*xGarden1])(grass3);
		garden.push(grass3);
		var grass4 = SIMPLEX_GRID([[-9/23*xGarden1,5/23*xGarden1],[-0.01,0.01],[11/23*xGarden1]]);
		grass4 = COLOR([0/255, 153/255, 0/255])(grass4);
		grass4 = T([2])([-11/23*xGarden1])(grass4);
		garden.push(grass4);
		var pointsStreet4 = [[16/23*xGarden1,0.01,-11/23*xGarden1],[16/23*xGarden1,0.01,-13/23*xGarden1],[13/23*xGarden1,0.01,-16/23*xGarden1],[10/23*xGarden1,0.01,-16/23*xGarden1],[7/23*xGarden1,0.01,-13/23*xGarden1],[7/23*xGarden1,0.01,-11/23*xGarden1]];
		var profileStreets4 = NUBS(S0)(2)(makeKnots(pointsStreet4))(pointsStreet4);
		
		var pointsStreet5 = [[14/23*xGarden1,0.01,-11/23*xGarden1],[14/23*xGarden1,0.01,-13/23*xGarden1],[11.5/23*xGarden1,0.01,-13/23*xGarden1],[9/23*xGarden1,0.01,-13/23*xGarden1],[9/23*xGarden1,0.01,-11/23*xGarden1]];
		var profileStreets5 = NUBS(S0)(2)(makeKnots(pointsStreet5))(pointsStreet5);
		var streets4 = BEZIER(S1)([profileStreets4,profileStreets5]);
		streets4 = MAP(streets4)(domain2d);
		garden.push(streets4);

		var pointsGrass5 = [[16/23*xGarden1,0.01,-16/23*xGarden1],[11.5/23*xGarden1,0.01,-16/23*xGarden1],[7/23*xGarden1,0.01,-16/23*xGarden1]];
		var nubsGrass5 = NUBS(S0)(2)(makeKnots(pointsGrass5))(pointsGrass5);
		var grass5 = BEZIER(S1)([nubsGrass5,profileStreets4]);
		grass5 = MAP(grass5)(domain2d);
		grass5 = COLOR([0/255, 153/255, 0/255])(grass5);
		garden.push(grass5); 

		var pointsGrass6 = [[14/23*xGarden1,0.01,-11/23*xGarden1],[11.5/23*xGarden1,0.1,-11/23*xGarden1],[9/23*xGarden1,0.01,-11/23*xGarden1]];
		var nubsGrass6 = NUBS(S0)(2)(makeKnots(pointsGrass6))(pointsGrass6);
		var grass6 = BEZIER(S1)([nubsGrass6,profileStreets5]);
		grass6 = MAP(grass6)(domain2d);
		grass6 = COLOR([0/255, 153/255, 0/255])(grass6);
		garden.push(grass6); 

		garden = STRUCT(garden);
		garden = T([0,1,2])([-12,-0.02,-2])(garden);
		return garden;
	}