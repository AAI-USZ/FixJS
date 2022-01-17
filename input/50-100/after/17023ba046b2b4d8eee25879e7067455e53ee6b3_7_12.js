function(){var t=this
if(t.parentNode)t.parentNode.removeChild(t)
Event.removeAll(t)
if("empty"in t)t.empty()
if("kill_hook"in t)t.kill_hook()
return t}