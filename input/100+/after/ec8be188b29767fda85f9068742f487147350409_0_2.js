function(){var elements=[];for(var i=0,len=arguments.length;i<len;i++){var element=arguments[i];if(typeof element=='string'){element=document.getElementById(element);}
if(arguments.length==1){return element;}
elements.push(element);}
return elements;};OpenLayers.Util.isElement=function(o){return!!(o&&o.nodeType===1);};OpenLayers.Util.isArray=function(a){return(Object.prototype.toString.call(a)==='[object Array]');}