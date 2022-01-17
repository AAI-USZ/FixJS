function(){
			var name=navigator.platform.match(/(Linux|FreeBSD|Mac|Win|SunOS)/i);
			return (name[1])?name[1]:(window.orientation != undefined)?"iPod":"Other";
		}