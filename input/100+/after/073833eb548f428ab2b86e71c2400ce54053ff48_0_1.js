function(k)
{
	switch( k )
	{
		case 22:
			// W
			this.player.moveTarget.z = -10;
			break;
		case 0:
			// A
			this.player.moveTarget.x = 10;
			break;
		case 18:
			// S
			this.player.moveTarget.z = 10;
			break;
		case 3:
			// D
			this.player.moveTarget.x = -10;
			break;
		case 16:
			this.player.moveTarget.y = 10;
			break;
		case 4:
			this.player.moveTarget.y = -10;
			break;
	}
}