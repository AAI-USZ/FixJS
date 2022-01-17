function(e)
{
	e.preventDefault();
	this.updateMousePosition(e);
	
	if(e.which==1)   //left button
	{
		
  	 var objectClicked = false;
	
	 //check if an object got clicked
	 for (var j = 0; j < this.references.length; j++)
     {
    
       for (var i = 0; i < this.references[j].node.length; i++)
       {
        if(this.references[j].node[i].selected==true)
    	{
    	    objectClicked=true;
    	    sm.consumeEvent('clickOnNode');   	    
    	    break;
    	 }
       }
       
       //check references
	   if(this.references[j].selected==true && !objectClicked)
	   {
	      objectClicked=true;document.getElementById("paper").value
	      this.references[j].drag=true;
	      sm.consumeEvent('clickOnReference');
	      this.draghelper=true;
	      break;for (var j = 0; j < this.connections.length; j++)
			{
				this.connections[j].paint(this);
			}
				
				for (var j = 0; j < this.references.length; j++)
			{
				this.references[j].paint(this);
			} 
	   }
    }
	
	if(objectClicked==false)
	{
		sm.consumeEvent('clickOnCanvas');
	}		
   }
   else if(e.which == 2)  //mousewheel
   {
      this.draghelper=true;
      sm.consumeEvent('clickMousewheel');
   }
   else
   {
     this.stopEvent(e);
	 return null;
   }
   
   
   
 	 mindmap.performState();
	
	 this.stopEvent(e);
	 return null;
	
}