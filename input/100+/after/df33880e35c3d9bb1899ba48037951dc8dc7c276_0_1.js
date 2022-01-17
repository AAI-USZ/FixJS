function(){

	//This is where we will store all of our player instances

	var players = {};	

	/*

	* Use this method for retrieving a player from the player list

	* @param playerID {string}: The id of the player object that we want to retrieve

	* @return {object}: Instance of a player if one with identical playerid exists, otherwise null

	*---------------------------------------------------------*/

	this.getPlayer = function(playerID){

		if(players[playerID] != undefined){

			return players[playerID];

		}

		return null;

	};

	/*

	* Use this method for adding a player to the player list

	* @param player {object}: The player object that we want to add to our PlayerManagers players list

	* @return {bool}: True if the player was added to the list, false if it already exists within the list

	*---------------------------------------------------------*/

	this.addPlayer = function(player){

		players[player.config.id] = player;

		return true;

	};

	/*

	* Use this method for removing a player from the player list

	* @param playerID {string}: The id of the player object that we want to delete

	*---------------------------------------------------------*/

	this.removePlayer = function(playerID){

		if(players[playerID] != undefined){

			players[playerID].destroy();

			delete players[playerID];

		}

	};

}