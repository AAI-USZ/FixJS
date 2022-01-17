function(targetpoint,title,authorandyear,refid,theMindMap)
{
  this.drag=false;
  this.authorandyear=authorandyear;
  this.title=title;
  this.line1;
  this.line2;
  this.nodesize=6;
  this.radius=16;
  this.rectangle = new Rectangle(targetpoint.x,targetpoint.y,theMindMap.currentwidth,theMindMap.currentheight); 
  this.refid=refid;
  this.node = new Array(4);
  this.node[0] = new Node(targetpoint.x- this.nodesize/2,targetpoint.y + theMindMap.currentheight/2 - this.nodesize/2,this.nodesize,this.nodesize,  refid,0); 
  this.node[1] = new Node(targetpoint.x+theMindMap.currentwidth-this.nodesize/2,targetpoint.y + theMindMap.currentheight/2 - this.nodesize/2 ,this.nodesize,this.nodesize,refid,1);
  this.node[2] = new Node(targetpoint.x + theMindMap.currentwidth/2 - this.nodesize/2,targetpoint.y- this.nodesize/2,this.nodesize,this.nodesize,  refid,2);
  this.node[3] = new Node(targetpoint.x + theMindMap.currentwidth/2 - this.nodesize/2,targetpoint.y + theMindMap.currentwidth/2 - this.nodesize/2,this.nodesize,this.nodesize, refid,3);  
  this.selected=false;
  
  this.oldPosition=targetpoint;

}