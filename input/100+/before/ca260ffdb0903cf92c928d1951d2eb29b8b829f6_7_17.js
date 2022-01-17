function(){}};joContainer=function(data){joView.apply(this,arguments);};joContainer.extend(joView,{tagName:"jocontainer",title:null,getContent:function(){return this.container.childNodes;},setTitle:function(title){this.title=title;return this;},setData:function(data){this.data=data;this.refresh();return this;},activate:function(){},deactivate:function(){},push:function(data){if(typeof data==='object'){if(data instanceof Array){for(var i=0;i<data.length;i++)
this.push(data[i]);}
else if(data instanceof joView&&data.container!==this.container){this.container.appendChild(data.container);}
else if(data instanceof HTMLElement){this.container.appendChild(data);}}
else{var o=document.createElement("div");o.innerHTML=data;this.container.appendChild(o);}},getTitle:function(){return this.title;}