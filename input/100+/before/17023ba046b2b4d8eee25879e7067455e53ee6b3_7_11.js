function(el,ev){
var _e=el._e||{}
for(var t in _e)
if(!ev||ev==t){
var fnList=_e[t]
for(var fn in fnList)
Event.remove(el,t,fnList[fn])
delete _e[t]}}