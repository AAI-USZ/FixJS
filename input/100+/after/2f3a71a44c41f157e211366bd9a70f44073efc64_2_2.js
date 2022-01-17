function(rotation, doSave)
{
	// Check if the item has no direction specified
	if (this.params.direction == null)
	{
		this.params.direction = "f";
	}
	
	for (var i = 0; i < this.dirns.length; ++i)
	{
		if (this.dirns[i] == this.params.direction)
		{
			// Rotate to the specified direction
			i += rotation;
			i = i % this.dirns.length;
			while (i < 0)
				i += this.dirns.length;
			
			this.setDirection(this.dirns[i], doSave);
			
			break;
		}
	}
}