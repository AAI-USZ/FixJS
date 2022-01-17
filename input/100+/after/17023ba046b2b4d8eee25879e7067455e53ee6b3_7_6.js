function touchHandler(e){Event.stop(e)
var touch=e.changedTouches[0],ev=d.createEvent("MouseEvent")
ev.initMouseEvent(
e.type.replace("touch","mouse").replace("start","down").replace("end","up"),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null)
touch.target.dispatchEvent(ev)}