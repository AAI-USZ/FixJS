function(){
		var roof = buildRoof1();
		var dome = buildDome();

		var chimney1 = COLOR(bColor)(SIMPLEX_GRID([[-0.1,0.4],[0.6],[-0.1,0.4]]));
		var chimney2 = COLOR([205/255,92/255,92/255])(SIMPLEX_GRID([[-0.05,0.5],[-0.6,0.05],[-0.05,0.5]]));
		var chimney3 = COLOR([205/255,92/255,92/255])(SIMPLEX_GRID([[-0.1,0.4],[-0.65,0.05],[-0.1,0.4]]));
		var chimney4 = COLOR([205/255,92/255,92/255])(SIMPLEX_GRID([[-0.1,0.075,-0.25,0.075],[-0.7,0.15],[-0.1,0.075,-0.25,0.075]]));
		var chimney5 = COLOR([205/255,92/255,92/255])(SIMPLEX_GRID([[-0.025,0.55],[-0.85,0.05],[-0.025,0.55]]));
		var chimney = STRUCT([chimney1,chimney2,chimney3,,chimney4,chimney5]);
		chimney = T([0,2])([5,0])(chimney);
		var chimney2 = T([0])([5.5])(chimney);
		var chimney3 = T([2])([15.35])(chimney);
		var chimney4 = T([2])([15.35])(chimney2);
		var roof = STRUCT([roof,dome,chimney,chimney2,chimney3,chimney4]);
		roof = T([0,1,2])([-3.81,11.16,6.69])(roof);
		return roof;
	}