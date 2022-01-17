function(node,classname,toggle){var node=joDOM.get(node);if(typeof node.className!=="undefined"){var n=node.className.split(/\s+/);for(var i=0,l=n.length;i<l;i++){if(n[i]==classname){if(l==1)
node.className="";else{n.splice(i,i);node.className=n.join(" ");}
return;}}
if(toggle){n.push(classname);node.className=n.join(" ");}}
else{node.className=classname;}},toggleCSSClass:function(node,classname){this.removeCSSClass(node,classname,true);}