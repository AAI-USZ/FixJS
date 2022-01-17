function(v,u){var w;p=d.getMapData(u);if(p!==o){if(o){l(o);
}k=[];n="";}if(p){w="";if(u.nodeName.toUpperCase()==="IMG"){if(!d.queueCommand(p,a(u),"set",[s,m,r])){if(m instanceof Array){if(m.length){w=m.join(",");
}}else{w=m;}if(w){a.each(i.split(w),function(x,y){j(p.getDataForKey(y.toString()));
o=p;});}}}else{r=m;if(!d.queueCommand(p,a(u),"set",[s,r])){j(p.getDataForArea(u));
o=p;}}}});if(p){l(p);}return this;};e.unbind=function(j){