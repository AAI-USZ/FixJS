function(event) {
	if(event.key == this.gameobjects[0].Id()) this.text.Position(this.gameobjects[0].Position());
	if(event.key == "number") this.score.Text(event.value + "");
}