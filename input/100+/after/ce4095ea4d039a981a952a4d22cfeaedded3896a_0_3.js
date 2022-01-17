function(){

		//target the group LI container
		var $liGroup = $(this).parent().parent();

		$liGroup.fadeOut('slow', function(){
			$liGroup.remove();
		});
		
		//find the players Name of selected group
		var $liGroupName = $liGroup.find('.list-item-name').text();
		tBrack.valueOfKey($liGroupName);

		console.log('Player position: ', playerPos);
		console.log('removing: ', $liGroupName);

		//remove this player from player list && refresh localStorage
		playerList.splice(playerPos,1);
		localStorage.setItem('playerList', JSON.stringify(playerList));
		tBrack.loadPList();
		tBrack.playerCount();

		return false;
	}