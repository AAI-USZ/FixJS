function drawVilla(){
	var drawer = new Drawer();

	drawer.addFoundation(foundation());
	drawer.drawFoundation();
	drawer.addSteps(steps());
	drawer.drawSteps();
	drawer.addBaseComponents(baseComponents());
	drawer.drawBaseComponents();
	drawer.addBuildingWall(buildingWall());
	drawer.drawBuildingWall();

	drawer.addLedge(ledge());
	drawer.drawLedge();

	//drawer.addTympanum(tympanum());
	//drawer.drawTympanum();

	//drawer.addColums(colums());
	//drawer.drawColums();

	//drawer.addGuttae(guttae());
	//drawer.drawGuttae();

	drawer.addBuildingRoof(buildingRoof());
	drawer.drawBuildingRoof();

	//drawer.all();
}