function(){
		var lRoof = 16.06;
		var hRoof = 4;
		var bRoofPoints = [[0,0,0],[0,0,0],[lRoof,0,0],[lRoof,0,0],[lRoof,0,lRoof],[lRoof,0,lRoof],[0,0,lRoof],[0,0,lRoof],[0,0,0],[0,0,0]];
		var bRoofdepth = NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,10,11,11])(bRoofPoints);
		var upRoof = NUBS(S0)(1)([0,0,1,1])([[lRoof/2,hRoof,lRoof/2],[lRoof/2,hRoof,lRoof/2]]);
		var roof = BEZIER(S1)([bRoofdepth,upRoof]);
		var roof = MAP(roof)(domain2d);
		roof = COLOR([205/255,92/255,92/255])(roof);
		return roof;
	}