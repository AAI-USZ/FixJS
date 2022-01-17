function(s){
var a=[],t=s.split("->")
if(t.length>1){
while(t.length){
s=t.pop()
a=t.pop().trim().split(/[\s,]+/m)
t.length&&t.push("(function("+a+"){return ("+s+")})")}
}else{
if(t=s.match(/^\s*(?:[+*\/%&|\^\.=<>]|!=)/)){
a.push("$1")
s="$1"+s}
if(s.match(/[+\-*\/%&|\^\.=<>!]\s*$/)){
a.push("$2")
s+="$2"
}else if(!t){
a=a.concat(s.replace(/'([^'\\]|\\.)*'|"([^"\\]|\\.)*"|this|arguments|\.\w+|\w+:/g,"").match(/\b[a-z_]\w*/g)).unique()}}
return new Function(a,"return("+s+")")
}