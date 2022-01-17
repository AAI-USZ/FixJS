function(format,custom){
var d=(new Date-this+1)/1000,a=D.prettySteps,i=a.length
if(d<a[0]){
while(d>a[--i]);d/=a[i+1];
return((a=custom||D.prettyStrings)[(i=D.prettyUnits[i]+(d<2?"":"s"))]||a["default"]).format(d|0,i)}
return this.format(format)}