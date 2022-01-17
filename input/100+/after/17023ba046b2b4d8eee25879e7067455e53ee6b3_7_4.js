function keyup(e){var key=e.keyCode||e.which,map=kbMaps[0]
if(key in map)map[key](key)
else if("num"in map&&key>47&&key<58)map.num(key-48)
else if("all"in map)map.all(key)
else{var i=0
while("bubble"in map&&(map=kbMaps[++i])){if(key in map)map[key](key)
else if("all"in map)map.all(key)}}}