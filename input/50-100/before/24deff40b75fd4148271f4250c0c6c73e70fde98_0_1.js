function(x,y,width,height,refid,nodeid)
{
   this.refid=refid;
   this.nodeid=nodeid;
   this.selected=false;
   this.rectangle = new Rectangle(x,y,width,height);
   
}