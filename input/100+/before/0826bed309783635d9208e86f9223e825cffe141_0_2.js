function documentMouseUp(e) {

	if(playerHeader.down){

	e.preventDefault();

	playerHeader.down = false;

	putInsidePage();

	}

}