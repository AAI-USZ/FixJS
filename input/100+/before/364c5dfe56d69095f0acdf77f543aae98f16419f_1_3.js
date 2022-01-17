function(){var f,e,c,g,j,k=this.input,d=[],h=this;
g=k.length;for(f=0;f<g;f++){e=a.mapster.getMapData(k[f]);if(e){if(!h.allowAsync&&b.queueCommand(e,h.input,h.name,h.args)){if(this.first){j="";
}continue;}c=e.getData(k[f].nodeName==="AREA"?k[f]:this.key);if(c){if(a.inArray(c,d)<0){d.push(c);
}}else{j=this.func_map.apply(e,h.args);}if(this.first||typeof j!=="undefined"){break;
}}}a(d).each(function(m,l){j=h.func_area.apply(l,h.args);});if(typeof j!=="undefined"){return j;
}else{return this.output;}}