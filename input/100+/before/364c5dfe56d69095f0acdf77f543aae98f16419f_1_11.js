function l(u){var v;j=(u.isSelectable()&&(u.isDeselectable()||!u.isSelected()));if(j){p=!u.isSelected();
}else{p=u.isSelected();}o=b.getBoundList(q,u.key);if(a.isFunction(q.onClick)){k=q.onClick.call(t,{e:m,listTarget:o,key:u.key,selected:p});
if(d.isBool(k)){if(!k){return false;}s=a(u.area).attr("href");if(s!=="#"){window.location.href=s;
return false;}}}if(j){r=u.toggleSelection();}if(q.boundList&&q.boundList.length>0){b.setBoundListProperties(q,o,u.isSelected());
}v=u.effectiveOptions();if(v.includeKeys){n=d.split(v.includeKeys);a.each(n,function(y,x){var w=f.getDataForKey(x.toString());
if(!w.options.isMask){l(w);}});}}