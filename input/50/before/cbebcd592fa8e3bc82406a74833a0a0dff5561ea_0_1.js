function(avatar, attacker)
{
    avatar.setItemParam('speech', "Death by " + attacker.params.fullname + "! Press space to restart.", false);
	this.controller.endGame();   

    // Oh dear. They've lost all their loot since their last save.
    //this.inventoryController.removeUnsavedItems();
}