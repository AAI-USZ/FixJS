function(){
	var fitness_score = 0;
	fitness_score = fitness_score + this.fitnessMeasureSide(this.orange_face,this.green_face,this.blue_face,this.white_face,this.yellow_face);
	fitness_score = fitness_score + this.fitnessMeasureSide(this.blue_face,this.orange_face,this.red_face,this.white_face,this.red_face);
	fitness_score = fitness_score + this.fitnessMeasureSide(this.green_face,this.orange_face,this.red_face,this.yellow_face,this.white_face);
	fitness_score = fitness_score + this.fitnessMeasureSide(this.white_face,this.orange_face,this.red_face,this.green_face,this.blue_face);
	fitness_score = fitness_score + this.fitnessMeasureSide(this.yellow_face,this.orange_face,this.red_face,this.blue_face,this.green_face);
	fitness_score = fitness_score + this.fitnessMeasureSide(this.red_face,this.green_face,this.blue_face,this.yellow_face,this.white_face);
	return fitness_score/this.total_fitness_points;
}