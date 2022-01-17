function()
	{
		if (d3.event.target == that.canvas.node())
		{
	        if (d3.event.ctrlKey)
	        { // mouse creating
                var newMouse = new Mouse(that);
                that.mice.push(newMouse);
	        } else
	        { // cat creating
            	var newCat = new Cat(that); //pass catManager
                that.cats.push(newCat);

            	catNames.push('shreda');
                redraw();
	        }
	        that.force.start();
    	}
	}