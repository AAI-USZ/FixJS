function(node,classname){this.removeCSSClass(node,classname,true);},create:function(tag,style){if(!this.enabled)
return null;if(typeof tag==="object"&&typeof tag.tagName==="string"){var o=document.createElement(tag.tagName);if(tag.className)
this.setStyle(o,tag.className);}
else{var o=document.createElement(tag);if(style)
this.setStyle(o,style);}
return o;}