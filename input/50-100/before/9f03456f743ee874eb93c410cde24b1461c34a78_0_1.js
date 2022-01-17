function() {
	this.pitchdeck = new pitchdeck.PitchDeck();
	var problem_data = specfactory.PitchDeckFactory.SlideData("problem");
	this.pitchdeck.LoadDeck([problem_data]);
	this.pitchdeck.Start();
}