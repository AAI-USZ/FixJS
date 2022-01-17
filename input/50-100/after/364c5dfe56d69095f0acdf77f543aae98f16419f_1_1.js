function(g,h,f,e){if(!g){return false;}if(!g.complete||g.currentAction){g.commands.push({that:h,command:f,args:e});
return true;}return false;}