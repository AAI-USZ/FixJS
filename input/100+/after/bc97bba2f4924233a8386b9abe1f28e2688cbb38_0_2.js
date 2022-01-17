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

	drawer.addColums(colums());
	drawer.drawColums();

	drawer.addTympanum(tympanum());
	drawer.drawTympanum();



	drawer.addGuttae(guttae());
	drawer.drawGuttae();

	drawer.addBuildingRoof(buildingRoof());
	drawer.drawBuildingRoof();
	
	drawer.addBuildingComponents(buildingComponents());
	drawer.drawBuildingComponents();

}