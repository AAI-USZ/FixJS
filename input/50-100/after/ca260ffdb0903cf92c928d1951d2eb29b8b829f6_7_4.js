function onchange(e){if(timer)
timer=clearTimeout(timer);if(req.readyState==4)
handler(req.responseText,0);}