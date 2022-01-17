function(w,d,P){var Event=w.Event||(w.Event={}),fn_id=0,kbMaps=[]
function cacheEvent(el,type,fn,fix_fn){var _e=el._e||(el._e={})
type in _e||(_e[type]={})
return(_e[type][fn._fn_id||(fn._fn_id=++fn_id)]=type=="mousewheel"?function(e){if(!e)e=w.event
var delta="wheelDelta"in e?e.wheelDelta/120 : -e.detail/3
delta!=0&&fn.call(el,e,delta)}:fix_fn)}
function uncacheEvent(el,type,fn){var _e=el._e||{}
if(type in _e&&"_fn_id"in fn&&fn._fn_id in _e[type]){var _fn=_e[type][fn._fn_id]
delete _e[type][fn._fn_id]
return _fn}
return fn}
if("addEventListener"in w){Event.add=function(el,ev,fn){var _fn=cacheEvent(el,ev,fn,fn)
ev=="mousewheel"&&el.addEventListener("DOMMouseScroll",_fn,false)
el.addEventListener(ev,_fn,false)
return Event}
Event.remove=function(el,ev,fn){var _fn=uncacheEvent(el,ev,fn)
ev=="mousewheel"&&el.removeEventListener("DOMMouseScroll",_fn,false)
el.removeEventListener(ev,_fn,false)
return Event}}else{Event.add=function(el,ev,fn){el.attachEvent("on"+ev,cacheEvent(el,ev,fn,function(){fn.call(el,w.event)}))
return Event}
Event.remove=function(el,ev,fn){el.detachEvent("on"+ev,uncacheEvent(el,ev,fn))
return Event}}
Event.stop=function(e){"stopPropagation"in e&&e.stopPropagation()
"preventDefault"in e&&e.preventDefault()
e.cancelBubble=e.cancel=true
return e.returnValue=false}
Event.removeAll=function(el,ev){var _e=el._e||{}
for(var t in _e)
if(!ev||ev==t){var fnList=_e[t]
for(var fn in fnList)
Event.remove(el,t,fnList[fn])
delete _e[t]}}
Event.pointerX=function(e){if("changedTouches"in e)e=e.changedTouches[0]
return e.pageX||e.clientX+d.body.scrollLeft||0}
Event.pointerY=function(e){if("changedTouches"in e)e=e.changedTouches[0]
return e.pageY||e.clientY+d.body.scrollTop||0}
Event.pointer=function(e){var x=Event.pointerX(e),y=Event.pointerY(e)
return{x:x,y:y,left:x,top:y}}
function keyup(e){var key=e.keyCode||e.which,map=kbMaps[0]
if(key in map)map[key](key)
else if("num"in map&&key>47&&key<58)map.num(key-48)
else if("all"in map)map.all(key)
else{var i=0
while("bubble"in map&&(map=kbMaps[++i])){if(key in map)map[key](key)
else if("all"in map)map.all(key)}}}
Event.setKeyMap=function(map){kbMaps.unshift(map)
kbMaps.length==1&&Event.add(document,"keyup",keyup)}
Event.removeKeyMap=function(map){if(kbMaps.length>0){var index=kbMaps.indexOf(map)
kbMaps.splice(index==-1?0:index,1)
kbMaps.length==0&&Event.remove(document,"keyup",keyup)}}
function touchHandler(e){Event.stop(e)
var touch=e.changedTouches[0],ev=d.createEvent("MouseEvent")
ev.initMouseEvent(
e.type.replace("touch","mouse").replace("start","down").replace("end","up"),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null)
touch.target.dispatchEvent(ev)}
function touchStart(e){if(e.touches.length==1){Event.add(d,"touchend",touchEnd).add(d,"touchcancel",touchEnd).add(d,"touchmove",touchHandler)
touchHandler(e)}}
function touchEnd(e){Event.remove(d,"touchend",touchEnd).remove(d,"touchcancel",touchEnd).remove(d,"touchmove",touchHandler)
touchHandler(e)}
Event.touch_as_mouse=function(el){Event.add(el,"touchstart",touchStart)}
var elCache={},fnCache={},dv=d.defaultView,getStyle=(dv&&"getComputedStyle"in dv?function(el,a){return el.style[a]||dv.getComputedStyle(el,null)[a]||null}:function(el,a){if(a=="opacity"){var opacity=el.filters("alpha").opacity
return isNaN(opacity)?1:(opacity?opacity/100:0)}
a=a.camelCase()
return el.style[a]||el.currentStyle[a]||null}),el_re=/([.#:])(\w+)/g,El=function(n,a){var pre={}
n=n.replace(el_re,function(_,o,s){pre[o=="."?(o="class",(o in pre&&(s=pre[o]+" "+s)),o):o=="#"?"id":s]=s
return ""})||"div"
var el=(elCache[n]||(elCache[n]=d.createElement(n))).cloneNode(true).set(pre)
return n in fnCache&&fnCache[n](el,a)||el.set(a)},css_map={"float":"cssFloat"}
function extend(e,p,k){if(e){if(!p)p=El[P]
for(k in p)e[k]=p[k]}
return e}
El.get=function(el){if(typeof el=="string")el=d.getElementById(el)
return "to"in el?el:extend(el)}
El.cache=function(n,el,custom){elCache[n]=typeof el=="string"?El(el):el
if(custom){fnCache[n]=custom}}
El.cache.el=elCache
El.cache.fn=fnCache
El.text=function(str){return d.createTextNode(str)}
var a={append:function(e,b){var t=this
if(e){if(typeof e=="string"||typeof e=="number")e=El.text(e)
else if(!("nodeType"in e)&&"length"in e){var len=e.length,i=0,f="createDocumentFragment"in d?d.createDocumentFragment():El("div")
while(i<len)t.append.call(f,e[i++]);
e=f}
if("nodeType"in e)t.insertBefore(e,b?(b===true?t.firstChild:typeof b=="number"?t.childNodes[b]:b):null)
"append_hook"in e&&e.append_hook()}
return t},after:function(e,b){e.parentNode.append(this,b?e:e.nextSibling)
return this},to:function(e,b){e.append(this,b)
return this},hasClass:function(n){return(" "+this.className+" ").indexOf(" "+n+" ")>-1},addClass:function(n){var t=this
t.className+=t.className==""?n:t.hasClass(n)?"":" "+n
return t}.byWords(),rmClass:function(n){var t=this
t.className=(" "+t.className+" ").replace(" "+n+" "," ").trim()
return t}.byWords(),toggleClass:function(n,status){var t=this
if((status===void 0&&!t.hasClass(n))||status){t.addClass(n)
return!0}
t.rmClass(n)
return!1}.byWords(),empty:function(){var t=this,n
while(n=t.firstChild)t.kill.call(n);
return t},kill:function(){var t=this
if(t.parentNode)t.parentNode.removeChild(t)
Event.removeAll(t)
if("empty"in t)t.empty()
if("kill_hook"in t)t.kill_hook()
return t},css:function(atr,val){var t=this
if(val)t.style[(css_map[atr]||atr).camelCase()]=val
else return getStyle(t,atr)
return t}.byKeyVal(),on:function(w,fn){Event.add(this,w,fn)
return this}.byWords(),non:function(w,fn){Event.remove(this,w,fn)
return this}.byWords(),set:function(args){var t=this,k,v
if(args){if(typeof args=="string"||"nodeType"in args||"length"in args)t.append(args)
else for(k in args){v=args[k]
if(k=="class"||k=="className")t.addClass(v)
else if(typeof v=="string")t.setAttribute(k,v)
else if(!v)t.removeAttribute(k)
else t[k]=v}}
return t},find:"querySelector"in d?function(sel){return this.querySelector(sel)}:function(sel){var rules=["_"],tag=sel.replace(el_re,function(_,o,s){rules.push(o=="."?"(' '+_.className+' ').indexOf(' "+s+" ')>-1":o=="#"?"_.id=='"+s+"'":"_."+s)
return ""})||"*",fn=rules.join("&&").fn(),el,els=this.getElementsByTagName(tag),i=0
while(el=els[i++])if(fn(el))return "to"in el?el:extend(el)}}
if(!(El[P]=extend((w.HTMLElement||w.Element||{})[P],a))){El[P]=a
var c=d.createElement
extend(d.body)
d.createElement=function(n){return extend(c(n))}
/*@cc_on
try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}
@*/}
w.El=El}