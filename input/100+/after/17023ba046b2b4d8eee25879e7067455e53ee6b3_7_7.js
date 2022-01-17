function(n,a){var pre={}
n=n.replace(el_re,function(_,o,s){pre[o=="."?(o="class",(o in pre&&(s=pre[o]+" "+s)),o):o=="#"?"id":s]=s
return ""})||"div"
var el=(elCache[n]||(elCache[n]=d.createElement(n))).cloneNode(true).set(pre)
return n in fnCache&&fnCache[n](el,a)||el.set(a)},css_map={"float":"cssFloat"}