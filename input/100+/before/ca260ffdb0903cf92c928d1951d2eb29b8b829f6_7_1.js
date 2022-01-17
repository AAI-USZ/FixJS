function(){return this.platform;},matchPlatform:function(test){return(test.indexOf(this.platform)>=0);},getVersion:function(){return this.version;},getLanguage:function(){return this.language;}};joDOM={enabled:false,get:function(id){if(typeof id==="string"){return document.getElementById(id);}
else if(typeof id==='object'){if(id instanceof joView)
return id.container;else
return id;}},remove:function(node){if(node.parentNode){node.parentNode.removeChild(node);}},enable:function(){this.enabled=true;}