function(e){if("changedTouches"in e)e=e.changedTouches[0]
return e.pageX||e.clientX+d.body.scrollLeft||0}