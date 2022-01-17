function() {
		var i,x,y,ourcookies=document.cookie.split(";");
		for (i=0;i<ourcookies.length;i++) {
  			x=ourcookies[i].substr(0,ourcookies[i].indexOf("="));
  			y=ourcookies[i].substr(ourcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
  			if (x == "dynmapurl") {
  				var v = unescape(y);
  				document.cookie='dynmapurl=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
  				if((v.indexOf('?') >= 0) && (v != window.location)) {
					window.location = v;
					return true;
				}
			}
		}		  				
		return false;
    }