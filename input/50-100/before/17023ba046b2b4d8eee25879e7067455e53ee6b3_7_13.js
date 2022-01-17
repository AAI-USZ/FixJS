function(e){
if("changedTouches"in e)e=e.changedTouches[0]
return e.pageY||e.clientY+d.body.scrollTop||0}