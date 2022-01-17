function() {
	this.pitchdeck = new pitchdeck.PitchDeck();
	var ui_data = specfactory.PitchDeckFactory.UIData();
	this.pitchdeck.LoadUI(ui_data);
	var problem_data = specfactory.PitchDeckFactory.SlideData("problem");
	this.pitchdeck.LoadDeck([problem_data]);
	this.pitchdeck.Start();
}