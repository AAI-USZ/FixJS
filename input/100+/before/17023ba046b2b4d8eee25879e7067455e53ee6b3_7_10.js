function(e){
"stopPropagation"in e&&e.stopPropagation()
"preventDefault"in e&&e.preventDefault()
e.cancelBubble=e.cancel=true
return e.returnValue=false}