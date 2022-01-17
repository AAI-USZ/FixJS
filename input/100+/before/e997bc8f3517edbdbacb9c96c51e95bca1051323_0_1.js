function () {
	this.hideAnswer();
	document.getElementById("card-graphic").setAttribute("id", "card-flip");
	this.cardCount = this.cardCount + 1;
	if (!this.isLastCard()) {
	    this.cardFlipSound.play();
	    this.setCardContent();
	    document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
	    if (this.cardSet === this.cardDecks.COLORDECK) {
		document.getElementById("card-answer").style.color = this.deckAnswer[this.cardCount];
	    }
	    document.getElementById("card-flip").setAttribute("id", "card-graphic");
	} else {
	    this.endGame();
	}
    }