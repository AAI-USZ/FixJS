function(keyCode)
{
    this.triggerKeyEvents(keyCode);

	if(this.currentFocusIndex)
	{
		currentDescriptor = this.descriptors[this.currentFocusIndex];
                var Keys =  this.presentation.keys;
		switch (keyCode)
		{

			case Keys.CURSOR_UP:
				if(currentDescriptor.self.moveUp)
					this.__setCurrentFocus(currentDescriptor.self.moveUp.focusIndex)
                
			break;		
			
			case Keys.CURSOR_DOWN:
				if(currentDescriptor.self.moveDown)
					this.__setCurrentFocus(currentDescriptor.self.moveDown.focusIndex)


			break;
			
			case Keys.CURSOR_LEFT:
				if(currentDescriptor.self.moveLeft)
					this.__setCurrentFocus(currentDescriptor.self.moveLeft.focusIndex)
					
			break;
			
			case Keys.CURSOR_RIGHT:
				if(currentDescriptor.self.moveRight)
					this.__setCurrentFocus(currentDescriptor.self.moveRight.focusIndex)
				
			break;					
			
			case Keys.ENTER:
				for(var i in currentDescriptor.mediaArray)
				{
					currentMedia = currentDescriptor.mediaArray[i];
					$(currentMedia).trigger('selection.onSelection');
				}
				
			break;


            
			
		}
	}
}