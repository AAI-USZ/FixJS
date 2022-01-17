function findhref(node){if(!node)
return null;if(node.href)
return node;if(typeof node.parentNode!=="undefined"&&node.parentNode!==container)
return findhref(node.parentNode);else
return null;}}});joInput=function(data){joControl.apply(this,arguments);};joInput.extend(joControl,{tagName:"input",type:"text",setData:function(data){