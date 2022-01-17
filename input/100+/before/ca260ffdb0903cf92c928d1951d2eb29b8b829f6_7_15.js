function(parent){jo.initTagMap();return this.get(parent);};joInterface.prototype={get:function(parent){parent=joDOM.get(parent);if(!parent)
parent=document.body;var ui={};var setContainer=joView.setContainer;var draw=joView.draw;parse(parent);joView.setContainer=setContainer;joView.draw=draw;function parse(node){if(!node)
return;var args="";if(node.childNodes&&node.firstChild){var kids=node.childNodes;args=[];for(var i=0,l=kids.length;i<l;i++){var p=parse(kids[i]);if(p)
args.push(p);}}
return newview(node,args);}
function newview(node,args){var tag=node.tagName;var view=node;if(jo.tagMap[tag]){if(args instanceof Array&&args.length){if(args.length==1)
args=args[0];}
if(args instanceof Text)
args=node.nodeData;if(!args)
args=node.value||node.checked||node.innerText||node.innerHTML;joView.setContainer=function(){this.container=node;return this;};if(typeof jo.tagMap[tag]==="function"){var o=jo.tagMap[tag];}
else{var t=node.type||node.getAttribute("type");var o=jo.tagMap[tag][t];}
if(typeof o==="function")
var view=new o(args);else
joLog("joInterface can't process ",tag,"'type' attribute?");}
if(node.id)
ui[node.id]=view;return view;}
return ui;}};joCollect={get:function(parent){return new joInterface(parent);}}