function(e)
{
	this.canvas.focus();
  	e.preventDefault(); 
	this.updateMousePosition(e);
	
	var flag = false;

	//mark selected objects
	for (var j = 0; j < this.references.length; j++)
    {
		if(this.references[j].rectangle.areacontains(this.mousePosition))
		{
		    if(this.references[j].rectangle.contains(this.mousePosition))
		    {
				this.references[j].selected=true;
				flag=true;
			}
		    else
		 	{
				this.references[j].selected=false;			
			}
			
			for (var i = 0; i < this.references[j].node.length; i++)
    		{
    		  if (this.references[j].node[i].rectangle.contains(this.mousePosition))
    		  {  
    		    this.references[j].node[i].selected=true;
    		    flag=true;
    		  }
    		  else
    		  {
    		    this.references[j].node[i].selected=false;    		  
    		  }
			}		    
		}
		else
		{
			this.references[j].selected=false;
			for (var i = 0; i < this.references[j].node.length; i++)
    		{			
    			this.references[j].node[i].selected=false;
    		}
		}
						
    }
    
    if(!flag)
    {
    	for (var j = 0; j < this.connections.length; j++)
    	{
    		if(this.connections[j].contains(this.mousePosition))
    			this.connections[j].selected=true;
    		else
    			this.connections[j].selected=false;
    	}
    }
    
	
	this.performState();
	this.stopEvent(e); 
}