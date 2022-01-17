function(fromStorage){
	if(typeof(window.localStorage) != 'undefined'){ 
		window['localStorage'].localeStorageCubeKey = "rubikscubesave";
	} 
	else{ 
		alert('localStorage needed for application, upgrade your browser');
	}
	
	if (!fromStorage){
		this.cube = new RubikCube();
		this.cube.shuffle();
		window['localStorage'].setItem(window['localStorage'].localeStorageKey,this.cube);
	}else{
		this.cube = window['localStorage'].getItem(window['localStorage'].localeStorageCubeKey);
		
	}
	this.base_score = this.cube.fitnessMeasure();
	this.lastgen_score = 0.0;
	this.generation = 0;
	this.lastgen_moves = [];
	this.lastgen_scores = [];
	this.next_moves = [];
	this.total_gen_moves = [];
	this.total_gen_scores = [];
	this.total_gen_scores.push(this.base_score);
	this.total_cubes = [];
	this.total_cubes.push(this.cube);
	/*
		how it works:
		generate X number of moves to lastgen_moves
		apply X number of lastgen_moves and calculate scores stored in lastgen_scores
		loop through lastgen_moves to find find best from lastgen_scores
	*/
}