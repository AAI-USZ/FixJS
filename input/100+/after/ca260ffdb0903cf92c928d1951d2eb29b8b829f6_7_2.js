function(node,classname){node=joDOM.get(node);if(typeof node.className!=="undefined"){var n=node.className.split(/\s+/);for(var i=0,l=n.length;i<l;i++){if(n[i]==classname)
return;}
n.push(classname);node.className=n.join(" ");}
else{node.className=classname;}}