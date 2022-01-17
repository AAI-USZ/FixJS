function(el,a){return el.style[a]||dv.getComputedStyle(el,null)[a]||null}:function(el,a){if(a=="opacity"){var opacity=el.filters("alpha").opacity
return isNaN(opacity)?1:(opacity?opacity/100:0)}
a=a.camelCase()
return el.style[a]||el.currentStyle[a]||null}