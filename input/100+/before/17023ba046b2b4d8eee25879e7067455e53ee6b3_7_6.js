function(format){
var t=this,d=new Date,m,n=+t||Date.parse(t)||""+t
if(isNaN(n)){
if(m=n.match(/(\d{4})-(\d{2})-(\d{2})/))d.setFullYear(m[1],m[2]-1,m[3])
else if(m=n.match(/(\d{2})\.(\d{2})\.(\d{4})/))d.setFullYear(m[3],m[2]-1,m[1])
else if(m=n.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/))d.setFullYear(m[3],m[1]-1,m[2])
m=n.match(/(\d{1,2}):(\d{2}):?(\d{2})?\.?(\d{3})?/)||[0,0,0]
if(n.match(/pm/i)&&m[1]<12)m[1]+=12
d.setHours(m[1],m[2],m[3]||0,m[4]||0)
n.indexOf("Z")>-1&&d.setTime(d-(d.getTimezoneOffset()*60000))
}else d.setTime((n<4294967296?n*1000:n))
return format?d.format(format):d}