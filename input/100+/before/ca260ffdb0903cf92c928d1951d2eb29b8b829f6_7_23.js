function(index,silent){this.value=index;if(index==null)
return;if(typeof this.container==='undefined'||!this.container||!this.container.firstChild){return this;}
var node=this.getNode(this.value);if(node){if(this.lastNode)
joDOM.removeCSSClass(this.lastNode,"selected");joDOM.addCSSClass(node,"selected");this.lastNode=node;}
if(index>=0&&!silent){this.fireSelect(index);this.changeEvent.fire(index);}
return this;},getNode:function(index){return this.container.childNodes[index];},fireSelect:function(index){this.selectEvent.fire(index);},getValue:function(){return this.value;}