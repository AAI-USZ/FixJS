function(a,c){if(-1!=a.indexOf("youtube.com/watch?")||-1!=a.indexOf("youtube.com/v/"))return"video/youtube";var a=a.split("?")[0].split("."),a=a[a.length-1],e;b.each(g.mimeTypes[c],function(b,c){if(-1!==c.indexOf(a))return e=b,!1});return e}