function () {
	if (chrall.playerInvalid()) return false;
	var key = 'troll.' + chrall.playerId() + '.compteActif';
	return localStorage[key] == 'yes';
}