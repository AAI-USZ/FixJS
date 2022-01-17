function(e,b){var t=this
if(e){if(typeof e=="string"||typeof e=="number")e=El.text(e)
else if(!("nodeType"in e)&&"length"in e){var len=e.length,i=0,f="createDocumentFragment"in d?d.createDocumentFragment():El("div")
while(i<len)t.append.call(f,e[i++]);
e=f}
if("nodeType"in e)t.insertBefore(e,b?(b===true?t.firstChild:typeof b=="number"?t.childNodes[b]:b):null)
"append_hook"in e&&e.append_hook()}
return t}