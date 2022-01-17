function(){if(!this.container)
this.createContainer();if(!this.data||!this.data.length)
return;jo.flag.stopback=this.index?true:false;var container=this.container;var oldchild=this.lastNode;var newnode=getnode(this.data[this.index]);var newchild=this.getChildStyleContainer(newnode);function getnode(o){return(o instanceof joView)?o.container:o;}
if(!newchild)
return;var oldclass,newclass;if(this.index>this.lastIndex){oldclass="prev";newclass="next";joDOM.addCSSClass(newchild,newclass);}
else if(this.index<this.lastIndex){oldclass="next";newclass="prev";joDOM.addCSSClass(newchild,newclass);}
this.appendChild(newnode);var self=this;var transitionevent=null;joDefer(animate,this,1);function animate(){if(typeof window.onwebkittransitionend!=='undefined')
transitionevent=joEvent.on(newchild,"webkitTransitionEnd",cleanup,self);else
joDefer(cleanup,this,200);if(newclass&&newchild)
joDOM.removeCSSClass(newchild,newclass);if(oldclass&&oldchild)
joDOM.addCSSClass(oldchild,oldclass);}
function cleanup(){if(oldchild){joDOM.removeCSSClass(oldchild,"next");joDOM.removeCSSClass(oldchild,"prev");self.removeChild(oldchild);}
if(newchild){if(transitionevent)
joEvent.remove(newchild,"webkitTransitionEnd",transitionevent);joDOM.removeCSSClass(newchild,"next");joDOM.removeCSSClass(newchild,"prev");}}
if(typeof this.data[this.index].activate!=="undefined")
this.data[this.index].activate.call(this.data[this.index]);this.lastIndex=this.index;this.lastNode=newchild;return this;},appendChild:function(child){this.container.appendChild(child);},getChildStyleContainer:function(child){return child;},getChild:function(){return this.container.firstChild;},getContentContainer:function(){return this.container;}