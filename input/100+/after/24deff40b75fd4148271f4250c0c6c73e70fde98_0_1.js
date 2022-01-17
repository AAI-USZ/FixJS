function(targetpoint,title,authorandyear,theMindMap)
{
  this.drag=false;
  this.authorandyear=authorandyear;
  this.title=title;
  this.line1;
  this.line2;
  this.nodesize=6;
  this.radius=16;
  this.rectangle = new Rectangle(targetpoint.x,targetpoint.y,theMindMap.currentwidth,theMindMap.currentheight); 
  this.node = new Array(4);
  this.node[0] = new Node(targetpoint.x- this.nodesize/2,targetpoint.y + theMindMap.currentheight/2 - this.nodesize/2,this.nodesize,this.nodesize); 
  this.node[1] = new Node(targetpoint.x+theMindMap.currentwidth-this.nodesize/2,targetpoint.y + theMindMap.currentheight/2 - this.nodesize/2 ,this.nodesize,this.nodesize);
  this.node[2] = new Node(targetpoint.x + theMindMap.currentwidth/2 - this.nodesize/2,targetpoint.y- this.nodesize/2,this.nodesize,this.nodesize);
  this.node[3] = new Node(targetpoint.x + theMindMap.currentwidth/2 - this.nodesize/2,targetpoint.y + theMindMap.currentwidth/2 - this.nodesize/2,this.nodesize,this.nodesize);  
  
  this.selected=false;
  
  this.oldPosition=targetpoint;

}