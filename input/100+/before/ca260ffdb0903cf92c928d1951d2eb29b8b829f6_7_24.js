function(index){return this.container.childNodes[index];},fireSelect:function(index){this.selectEvent.fire(index);},getValue:function(){return this.value;},onMouseDown:function(e){joEvent.stop(e);var node=joEvent.getTarget(e);var index=-1;while(index==-1&&node!==this.container){index=node.getAttribute("index")||-1;node=node.parentNode;}
if(index>=0)
this.setValue(index);}