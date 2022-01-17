function(y,instant){var node=this.container.firstChild;if(!node)
return;if(typeof y=='object'){if(y instanceof HTMLElement)
var e=y;else if(y instanceof joView)
var e=y.container;var t=0-e.offsetTop;var h=e.offsetHeight+80;var y=top;var top=this.getTop();var bottom=top-this.container.offsetHeight;if(t-h<bottom)
y=(t-h)+this.container.offsetHeight;if(y<t)
y=t;}
if(y<0-node.offsetHeight)
y=0-node.offsetHeight;else if(y>0)
y=0;if(!instant){joDOM.addCSSClass(node,'flick');}
else{joDOM.removeCSSClass(node,'flick');joDOM.removeCSSClass(node,'flickback');}
this.moveTo(0,y);}