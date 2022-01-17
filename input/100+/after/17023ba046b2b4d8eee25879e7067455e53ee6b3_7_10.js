function(args){var t=this,k,v
if(args){if(typeof args=="string"||"nodeType"in args||"length"in args)t.append(args)
else for(k in args){v=args[k]
if(k=="class"||k=="className")t.addClass(v)
else if(typeof v=="string")t.setAttribute(k,v)
else if(!v)t.removeAttribute(k)
else t[k]=v}}
return t},find:"querySelector"in d?function(sel){return this.querySelector(sel)}