function newview(node,args){var tag=node.tagName;var view=node;if(jo.tagMap[tag]){if(args instanceof Array&&args.length){if(args.length==1)
args=args[0];}
if(args instanceof Text)
args=node.nodeData;if(!args)
args=node.value||node.checked||node.innerText||node.innerHTML;joView.setContainer=function(){this.container=node;return this;};var o;if(typeof jo.tagMap[tag]==="function"){o=jo.tagMap[tag];}
else{var t=node.type||node.getAttribute("type");o=jo.tagMap[tag][t];}
if(typeof o==="function")
view=new o(args);else
joLog("joInterface can't process ",tag,"'type' attribute?");}
if(node.id)
ui[node.id]=view;return view;}