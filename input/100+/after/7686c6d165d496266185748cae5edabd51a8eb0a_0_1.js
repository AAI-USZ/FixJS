function processGameMessage(s,msgUID,msgUserName)
{
	switch(s.type)
	{
	case "setLibraryNumber":
		if (s.uid==myUID) stage.get("#libraryCountText")[0].setText(s.body.toString());
		else stage.get("#oppoLibraryCountText")[0].setText(s.body.toString());
		FixedLayer.draw();
		break;
	case "chooseColor":
		log(s.username + " chose " + s.body + ".\n\n");
		chooseColorVisual(s.body);
		break;
	case "removeColor":
		log(s.username + " removed " + s.body + ".\n\n");
		removeColorVisual(s.body);
		break;
	case "choosePhase":
		log(s.username + " set the current phase to " + s.body.substr(0,s.body.length-3) + ".\n\n");
		choosePhaseVisual(s.body);
		break;
	case "adjustLifeTotal":
		log(s.username + " changed their life total to " + s.body + " life.\n\n");
		adjustLifeTotalVisual(s.body, s.uid == myUID);
		break;
	case "drawCards":
		drawCardsVisual(s);
		break;
	case "setOppoHandNumber":
		adjustOppoHandCardVisual(s.body)
		break;
	case "putCardFromHandOntoStack":
		card = s.body;
		if (s.uid==myUID) handCardDisplayer.number--;
		log(s.username + " put " + card.cardName + " onto the stack.\n\n");
		displayCard(card,s.uid == myUID);
		break;
	case "putCardFromHandOntoBattlefield":
		card = s.body;
		if (s.uid==myUID) handCardDisplayer.number--;
		log(s.username + " put " + card.cardName + " onto the battlefield.\n\n");
		displayCard(card,s.uid == myUID);
		break;
	case "dragEndBattlefieldCard":
		card = s.body;
		dragEndBattlefieldCardVisual(card);
		break;			
	case "displayCard":
		//used to recover the game state on reconnection
		var cards = s.body;
		var i = 0;
		for (i = 0; i<cards.length; i++)
		{
			displayCard(cards[i],cards[i].ownerUID == myUID);
		}
		break;
	default:
	}
}