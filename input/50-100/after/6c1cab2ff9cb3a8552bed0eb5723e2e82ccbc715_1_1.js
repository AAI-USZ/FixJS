function(inProps, inName) {
			var i = Documentor.indexByName(inProps, inName), p;
			if (i >= 0) {
				p = inProps[i];
				inProps.splice(p, 1);
			}
			return p && p.value && p.value.length && p.value[0].token;
		}