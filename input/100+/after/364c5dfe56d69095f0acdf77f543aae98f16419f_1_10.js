function(j){var k,i=f.getDataForArea(this),l=f.options;if(f.currentAreaId<0||!i){return;
}k=f.getDataForArea(j.relatedTarget);if(k===i){return;}f.currentAreaId=-1;i.area=null;
h(l.mouseoutDelay,i,f.clearEffects);if(a.isFunction(l.onMouseout)){l.onMouseout.call(this,{e:j,options:l,key:i.key,selected:i.isSelected()});
}}