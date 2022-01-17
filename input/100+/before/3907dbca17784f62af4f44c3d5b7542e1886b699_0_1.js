function(element) {
			if(element.className) {
				var classes = element.className.split(" ");
				for(var n = classes.length; n--;) {
					if(Parallax.elementTypes[classes[n]])
						Parallax.add(new (Parallax.elementTypes[classes[n]])(element))
				}
			}
		}