function()
{

   this.canvas.style.background = this.settings.background;
   this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
   
   
   switch ( sm.getStatus() ) 
   {
    case "idle": 	
    				var text;
    				if ( document.getElementById("paper").value )
    				{
    					text = document.getElementById("paper").value;
    				}
    				else
    				{
    				    text = "";
    				}
   					this.roundedRect(this.mousePosition.x - this.currentwidth/2, this.mousePosition.y - this.currentheight/2 , this.currentwidth , this.currentheight , 16, text );
					this.renderMap();  
    				
                   break;
 
    case "addReference": 	if( document.getElementById("paper").value!="" )
    						{
    						  if( !this.checkNames( document.getElementById("paper").value ) )
    						  {
    							  
    							  
    							  
    						  var tempPoint = new SinglePoint(this.mousePosition.x - this.currentwidth/2 , this.mousePosition.y - this.currentheight/2 );
							  this.references[this.references.length] = new Reference(tempPoint, document.getElementById("paper").value , document.getElementById("paper").value, this.references.length, this);
							
							  document.getElementById("paper").value="";
							
							  this.literaturelist();
    						  }
    						}
    						this.renderMap();
    						sm.consumeEvent('backToIdle');
                     		break;
                     		
    case "dragReference":		
    						for (var j = 0; j < this.references.length; j++)
    						{
    					 	  if(this.references[j].drag)
							  {	
							  
							    var deltax = 0;
							    var deltay = 0;
 							    if(!this.draghelper)
								{
									deltax = this.mousePosition.x - this.references[j].oldPosition.x;
     							    deltay = this.mousePosition.y - this.references[j].oldPosition.y;
     							    
     							}
     							this.draghelper=false;
     							
								this.references[j].rectangle.x += deltax;
								this.references[j].rectangle.y += deltay;
								
								for (var i = 0; i < this.references[j].node.length; i++)
    							{
									this.references[j].node[i].rectangle.x += deltax;
									this.references[j].node[i].rectangle.y += deltay;
    							}		
			
								this.references[j].oldPosition=this.mousePosition;
								break;
								
							  }
							}
							
    						this.renderMap();
    
    						 
							break;
							
							
	case "endDragReference": for (var j = 0; j < this.references.length; j++)
    						{  						
    						  this.references[j].drag=false;   
    						}
    						
	                        this.renderMap();
    
    						 
    						sm.consumeEvent('backToIdle');
    						
							break;
							
	case "createStartNode":	for (var j = 0; j < this.references.length; j++)
    						{
								for (var i = 0; i < this.references[j].node.length; i++)
								{
									if(this.references[j].node[i].selected)
									{
										this.startNode=this.references[j].node[i];
										sm.consumeEvent('proceedToDrawLine');
										break;
									}
								
								}
    						}
			
	case "drawLine":		this.context.lineWidth = 1;
							this.context.fillStyle = "#ffffff";
							this.context.strokeStyle = "#000000";
							this.context.beginPath();
							this.context.moveTo(this.startNode.rectangle.x +3 , this.startNode.rectangle.y +3);
							this.context.lineTo(this.mousePosition.x,this.mousePosition.y);
							this.context.closePath();
							this.context.stroke(); 
							
							this.renderMap();
    
    						
							
    						break;
    						
    case "addConnection":   
    						for (var j = 0; j < this.references.length; j++)
    						{
								for (var i = 0; i < this.references[j].node.length; i++)
								{
									if(this.references[j].node[i].selected)
									{
										this.connections[this.connections.length] = new Connection(this.startNode,this.references[j].node[i]);
										sm.consumeEvent('backToIdle');
									}
								}
    						}
    						
    						this.renderMap();
    						break;
    						
    						
    case "deleteObject":	var delref;	
    	
    						for (var j = 0; j < this.references.length; j++)
    						{
    						    if(this.references[j].selected)
    						    {  
    						    	delref=j;
    						    }    						     
    						}
    						
    						var i=0;
    						var delcon=[];
    						
    						for (var j = 0; j < this.connections.length; j++)
    						{
    						    if( (this.connections[j].to == this.references[delref].node[0]) || (this.connections[j].to == this.references[delref].node[1]) || (this.connections[j].to == this.references[delref].node[2]) || (this.connections[j].to == this.references[delref].node[3]) || (this.connections[j].from == this.references[delref].node[0]) || (this.connections[j].from == this.references[delref].node[1]) || (this.connections[j].from == this.references[delref].node[2]) || (this.connections[j].from == this.references[delref].node[3])  )
    						    {  
    						    	delcon[i++]=j;
    						    }    						     
    						}
    						
    						for (var j = 0; j < delcon.length; j++)
    						{
    							this.connections.splice(delcon[j],1);    						     
    						}
    						
    						
    						this.references.splice(delref,1);
    						
    						
    						this.canvas.style.background = this.settings.background;
   							this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);		
    						
   							this.renderMap();
    
   							this.literaturelist();
    
    						sm.consumeEvent('backToIdle');
    						break; 
    						
    case "zoomState":		//alert("zoom value "+this.zoomdelta);
    						if( (this.currentheight <= 36) && (this.zoomdelta<0) )
    						{}
    						else
    						{
							  this.currentwidth = this.currentwidth*(1+this.zoomdelta/10);
							  this.currentheight = this.currentheight*(1+this.zoomdelta/10);
	    
    						  for (var j = 0; j < this.references.length; j++)
    						  {
								this.references[j].zoom(this.zoomdelta/10, this.mousePosition);
    						  }
    						
    						  
    						}
    						this.roundedRect(this.mousePosition.x - this.currentwidth/2, this.mousePosition.y - this.currentheight/2 , this.currentwidth , this.currentheight , 16, document.getElementById("paper").value );
   							this.renderMap();
    
    						sm.consumeEvent('backToIdle');
    						break; 
    						
    case "panState":		
    	                    if(this.references[0])
    	                    {
    						  var deltax = 0;
							  var deltay = 0;
 							  if(!this.draghelper)
							  {
								deltax = this.mousePosition.x - this.references[0].oldPosition.x;
   							    deltay = this.mousePosition.y - this.references[0].oldPosition.y;
   							  }
   							  this.draghelper=false;
							
							  for (var j = 0; j < this.references.length; j++)
    						  {
    							this.references[j].rectangle.x += deltax;
								this.references[j].rectangle.y += deltay;
								for (var i = 0; i < this.references[j].node.length; i++)
								{
									this.references[j].node[i].rectangle.x += deltax;
									this.references[j].node[i].rectangle.y += deltay;
								}
    						  }
							
							  this.references[0].oldPosition=this.mousePosition;
    	                    }
							this.renderMap();
    						break;
    
 
    default: alert('default state');
   }

}