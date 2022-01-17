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
	this.base_score = this.cube.fitnessMeasure(); 	//initial score for the cube
	this.generation = 0;							//which round of generation we are on
	
	this.lastgen_score = 0.0;						//last generation cube score
	this.lastgen_scores = [];						//scores for each of the moves of last generation
	this.score_history = [];						//scores for the best found score in last rounds- is this increasing?						
	this.score_history.push(this.base_score);		//store for generation=0
	
	this.lastgen_moves = [];						//the computed moves of last round
	this.next_moves = [];							//moves to try next generation
	this.total_gen_moves = [];						
	
	
	this.cube_history = [];
	this.cube_history.push(this.cube);
	/*
		how it works:
		generation 0:
		generate X number of moves to lastgen_moves
		apply X number of lastgen_moves and calculate scores stored in lastgen_scores
		loop through lastgen_moves to find find best from lastgen_scores
	
		generation 1:
		grab X moves from last round up to the best score
		generate 20-X new moves
	*/
}