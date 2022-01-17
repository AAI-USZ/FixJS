function(w){var x,i,p,h,e,g,k,s,q,r,t,n,l,o,u=this,v=u.options,m;
function f(y,z){var j=new b.AreaData(u,y,z);j.areaId=u._xref[y]=u.data.push(j)-1;
return j.areaId;}u._xref={};u.data=[];if(!w){u.mapAreas=[];}m=!v.mapKey;if(m){v.mapKey="data-mapster-key";
}x=(a.browser.msie&&a.browser.version<=7)?"area":(m?"area[coords]":"area["+v.mapKey+"]");
i=a(u.map).find(x).unbind(".mapster");for(t=0;t<i.length;t++){h=0;g=i[t];e=a(g);if(!g.coords){continue;
}if(m){k=String(t);e.attr("data-mapster-key",k);}else{k=g.getAttribute(v.mapKey);
}if(w){s=u.mapAreas[e.data("mapster")-1];s.configure(k);}else{s=new b.MapArea(u,g,k);
u.mapAreas.push(s);}r=s.keys;for(p=r.length-1;p>=0;p--){q=r[p];if(v.mapValue){n=e.attr(v.mapValue);
}if(m){h=f(u.data.length,n);l=u.data[h];l.key=q=h.toString();}else{h=u._xref[q];if(h>=0){l=u.data[h];
if(n&&!u.data[h].value){l.value=n;}}else{h=f(q,n);l=u.data[h];l.isPrimary=p===0;}}s.areaDataXref.push(h);
l.areasXref.push(t);}o=e.attr("href");if(o&&o!=="#"&&!l.href){l.href=o;}if(!s.nohref){e.bind("mouseover.mapster",u.mouseover).bind("mouseout.mapster",u.mouseout).bind("click.mapster",u.click).bind("mousedown.mapster",u.mousedown);
}e.data("mapster",t+1);}u.setAreaOptions(v.areas);u.redrawSelections();}