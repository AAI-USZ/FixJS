function(ctx, tmpl) {
		var what = ctx.value.replace(/\.ist$/, ''),
			found, tryReq;
			
		// Try to find a previously require()-d template or string
		tryReq = [
			what,
			what + '.ist',
			'ist!' + what,
			'text!' + what + '.ist'
		];
		
		while (!found && tryReq.length) {
			try {
				found = requirejs(tryReq.shift());
			} catch(e) {
				if (tryReq.length === 0) {
					throw new Error("Cannot find included template '" + what + "'");
				}
			}
		}
		
		if (typeof found === 'string') {
			// Compile template
			found = ist(found, what);
		}
		
		if (typeof found.render === 'function') {
			// Render included template
			return found.render(this, tmpl.document);
		} else {
			throw new Error("Invalid included template '" + what + "'");
		}
	}