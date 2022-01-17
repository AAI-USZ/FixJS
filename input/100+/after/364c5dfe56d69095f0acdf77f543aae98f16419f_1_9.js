function(k){var j=f.getAllDataForArea(this),i=j.length?j[0]:null;
if(!i||i.isNotRendered()||i.owner.currentAction){return;}if(f.currentAreaId===i.areaId){return;
}if(f.highlightId!==i.areaId){f.clearEffects();i.highlight();if(f.options.showToolTip){a.each(j,function(m,l){if(l.effectiveOptions().toolTip){l.showToolTip();
}});}}f.currentAreaId=i.areaId;if(a.isFunction(f.options.onMouseover)){f.options.onMouseover.call(this,{e:k,options:i.effectiveOptions(),key:i.key,selected:i.isSelected()});
}}