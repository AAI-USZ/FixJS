function(msg){this.message=msg||"";},setEvents:function(){return this;}});joList=function(){this.setIndex=this.setValue;this.getIndex=this.getValue;joControl.apply(this,arguments);};joList.extend(joControl,{tagName:"jolist",defaultMessage:"",lastNode:null,value:null,autoSort:false,setDefault:function(msg){this.defaultMessage=msg;if(typeof this.data==='undefined'||!this.data||!this.data.length){if(typeof msg==='object'){this.innerHTML="";if(msg instanceof joView)
this.container.appendChild(msg.container);else if(msg instanceof HTMLElement)
this.container.appendChild(msg);}
else{this.innerHTML=msg;}}
return this;}